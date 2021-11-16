import Room from '../models/room'
import User from '../models/user'
import Booking from '../models/booking'
import catchAsyncError from '../middlewares/catchAsyncError'
import absoluteUrl from 'next-absolute-url'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Generate stripe checkout session => /api/checkout_session/:roomId

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
