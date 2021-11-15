import Booking from '../models/booking'
import cloudinary from 'cloudinary'
import catchAsyncErrors from '../middlewares/catchAsyncError'
import catchAsyncError from '../middlewares/catchAsyncError'
import absoluteUrl from 'next-absolute-url'
import ErrorHandler from '../utils/errorHandler'
import sendEmail from '../utils/sendEmail'
import crypto from 'crypto'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)
//POST Create new booking: /api/bookings
export const newBooking = catchAsyncErrors(async (req, res, next) => {
	console.log('req.body', req.body)
	console.log('req.user', req.user.sub)
	const {
		room,
		checkInDate,
		checkOutDate,
		daysOfStay,
		amountPaid,
		paymentInfo,
	} = req.body

	const booking = new Booking({
		room,
		user: req.user.sub,
		checkInDate,
		checkOutDate,
		daysOfStay,
		amountPaid,
		paymentInfo,
		paidAt: Date.now(),
	})

	await booking.save()

	res.status(200).json({
		success: true,
		booking,
	})
})

//GET check room booking availability: /api/bookings/check
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

//GET check booked dates of a room (display days booked in calendar): /api/bookings/check-booked-dates

export const checkBookedDatesOfRoom = catchAsyncErrors(
	async (req, res, next) => {
		const { roomId } = req.query

		const bookings = await Booking.find({ room: roomId })

		if (!bookings) {
			next(new ErrorHandler(404, 'No bookings found'))
		}
		// store all booked dates in an array
		let bookedDates = []

		const timeDifference = moment().utcOffset() / 60

		bookings.forEach(booking => {
			const checkInDate = moment(booking.checkInDate).add(
				timeDifference,
				'hour'
			)
			const checkOutDate = moment(booking.checkOutDate).add(
				timeDifference,
				'hour'
			)
			const range = moment.range(
				moment(checkInDate),
				moment(checkOutDate)
			)
			const dates = Array.from(range.by('days'))
			bookedDates = bookedDates.concat(dates)
		})

		res.status(200).json({
			success: true,
			bookedDates,
		})
	}
)

//GET get all booking of current user: api/bookings/me
export const myBookings = catchAsyncErrors(async (req, res, next) => {
	const bookings = await Booking.find({ user: req.user.sub })
		.populate({
			path: 'room',
			select: 'name pricePernight images',
		})
		.populate({
			path: 'user',
			select: 'name email',
		})
	if (!bookings) {
		next(new ErrorHandler(404, 'No bookings found'))
	}

	res.status(200).json({
		success: true,
		bookings,
	})
})

//GET get booking details: /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(async (req, res, next) => {
	const booking = await Booking.findById(req.query.id)
		.populate({
			path: 'room',
			select: 'name pricePernight images',
		})
		.populate({
			path: 'user',
			select: 'name email',
		})
	if (!booking) {
		next(new ErrorHandler(404, 'No booking found'))
	}
	res.status(200).json({
		success: true,
		booking,
	})
})
