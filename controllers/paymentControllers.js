import Room from '../models/room'
import User from '../models/user'
import Booking from '../models/booking'
import catchAsyncError from '../middlewares/catchAsyncError'
import absoluteUrl from 'next-absolute-url'
import getRawBody from 'raw-body'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//POST Generate stripe checkout session => /api/checkout_session/:roomId

export const stripeCheckoutSession = catchAsyncError(async (req, res, next) => {
	const { origin } = absoluteUrl(req)

	const room = await Room.findById(req.query.roomId)

	const { checkInDate, checkOutDate, dayOfStay, amount } = req.query

	// create stripe checkout sesssion
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				name: room.name,
				images: [`${room.images[0].url}`],
				amount: amount * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
		success_url: `${origin}/bookings/me`,
		cancel_url: `${origin}/rooms/${room._id}`,
		customer_email: req.user.email,
		client_reference_id: req.query.roomId,
		metadata: { checkInDate, checkOutDate, dayOfStay },
	})

	res.status(200).json(session)
})

//POST Create new booking after payment using stripe webhook => /api/webhook
export const webhookCheckout = catchAsyncError(async (req, res, next) => {
	const rawbody = await getRawBody(req)

	try {
		const signature = req.headers['stripe-signature']
		const event = stripe.webhooks.constructEvent(
			rawbody,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET
		)

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object

			const {
				client_reference_id,
				metadata,
				amount_total,
				payment_intent,
			} = session

			const { checkInDate, checkOutDate, daysOfStay } = metadata

			const user = await User.findOne({ email: session.customer_email })

			const booking = await Booking.create({
				room: client_reference_id,
				user: user._id,
				checkInDate,
				checkOutDate,
				daysOfStay,
				amountPaid: amount_total / 100,
				paymentInfo: {
					id: payment_intent.id,
					status: payment_intent.status,
				},
				paidAt: Date.now(),
			})

			res.status(200).json({
				success: true,
			})
		}
	} catch (error) {
		console.log('error from Stripe payment ', error)
	}
})
