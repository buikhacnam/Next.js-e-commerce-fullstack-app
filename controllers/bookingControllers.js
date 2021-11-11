import Booking from '../models/booking'
import cloudinary from 'cloudinary'
import catchAsyncErrors from '../middlewares/catchAsyncError'
import catchAsyncError from '../middlewares/catchAsyncError'
import absoluteUrl from 'next-absolute-url'
import ErrorHandler from '../utils/errorHandler'
import sendEmail from '../utils/sendEmail'
import crypto from 'crypto'

// Create new booking: /api/bookings
export const newBooking = catchAsyncErrors(async (req, res, next) => {
	const {
		room,
		checkInDate,
		checkOutDate,
		daysOfStay,
		amountPaid,
		paymentInfo,
	} = req.body

	const booking = await Booking.create({
		room,
		user: req.user._id,
		checkInDate,
		checkOutDate,
		daysOfStay,
		amountPaid,
		paymentInfo,
	})

	res.status(200).json({
		success: true,
		booking,
	})
})

// check room booking availability: /api/bookings/check
export const checkRoomAvailability = catchAsyncErrors(
	async (req, res, next) => {
		const { roomId, checkInDate, checkOutDate } = req.query
		const checkInDateQuery = new Date(checkInDate)
		const checkOutDateQuery = new Date(checkOutDate)

		const booking = await Booking.find({
			room: roomId,
			$and: [
				{
					// checkin date in db is not in between checkin and checkout date
					checkInDate: {
						$lte: checkOutDateQuery,
					},
				},
				{
					// checkout date in db is not in between checkin and checkout date
					checkOutDate: {
						$gte: checkInDateQuery,
					},
				},
			],
		})

		let isAvailable = false

		if (booking && booking.length === 0) {
			isAvailable = true
		}

		return res.status(200).json({
			success: true,
			isAvailable,
		})
	}
)
