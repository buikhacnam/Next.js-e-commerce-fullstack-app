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
        booking
    })
})
