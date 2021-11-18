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

	const { checkInDate, checkOutDate, daysOfStay, amount } = req.query

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
		metadata: { checkInDate, checkOutDate, daysOfStay },
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
				payment_status,
			} = session

			const { checkInDate, checkOutDate, daysOfStay } = metadata

			const user = await User.findOne({ email: session.customer_email })

			await Booking.create({
				room: client_reference_id,
				user: user._id,
				checkInDate,
				checkOutDate,
				daysOfStay,
				amountPaid: amount_total / 100,
				paymentInfo: {
					id: payment_intent,
					status: payment_status,
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

// sample session from Stripe event webhook
const sessionSample = {
	id: 'cs_test_a1x2zpRzdbGWh7QngM1Mf3SJbWAR6yLUw8rfp1u6WmTfL5uMnSmhuitTYk',
	object: 'checkout.session',
	after_expiration: null,
	allow_promotion_codes: null,
	amount_subtotal: 4000,
	amount_total: 4000,
	automatic_tax: { enabled: false, status: null },
	billing_address_collection: null,
	cancel_url: 'http://localhost:3000/rooms/615e309325e09c43e5485967',
	client_reference_id: '615e309325e09c43e5485967',
	consent: null,
	consent_collection: null,
	currency: 'usd',
	customer: 'cus_KcNxcXMwLxkyum',
	customer_details: {
		email: 'buikhacnam11@gmail.com',
		phone: null,
		tax_exempt: 'none',
		tax_ids: [],
	},
	customer_email: 'buikhacnam11@gmail.com',
	expires_at: 1637322819,
	livemode: false,
	locale: null,
	metadata: {
		checkInDate: '2021-11-20T17:00:00.000Z',
		checkOutDate: '2021-11-23T17:00:00.000Z',
		daysOfStay: '4',
	},
	mode: 'payment',
	payment_intent: 'pi_3Jx9BQE1XgUA6OuD0sQEeSNA',
	payment_method_options: {},
	payment_method_types: ['card'],
	payment_status: 'paid',
	phone_number_collection: { enabled: false },
	recovered_from: null,
	setup_intent: null,
	shipping: null,
	shipping_address_collection: null,
	shipping_options: [],
	shipping_rate: null,
	status: 'complete',
	submit_type: null,
	subscription: null,
	success_url: 'http://localhost:3000/bookings/me',
	total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
	url: null,
}
