import Room from '../models/room'
import Booking from '../models/booking'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'

// get all rooms
export const allRooms = catchAsyncError(async (req, res) => {
	console.log('req.query all rooms', req.query)
	const resPerPage = 4
	// get the total number of rooms (all conditions)
	const roomsCount = await Room.countDocuments()
	const features = new APIFeatures(Room.find({}), req.query).search().filter()
	let rooms = await features.query
	// afther running the search method, we get the result of the query, for exemple:
	// const rooms = await Room.find({ address: { '$regex': 'new york', '$options': 'i' } })

	// get number of rooms after filtering above
	let filteredRoomsCount = rooms.length

	// get rooms after doing pagination
	features.pagination(resPerPage)
	// query the room again after pagination
	// need to add clone to avoid 'Query was already executed' error
	rooms = await features.query.clone()

	res.status(200).json({
		success: true,
		roomsCount,
		resPerPage,
		filteredRoomsCount,
		message: 'All Rooms',
		rooms,
	})
})

//create a new room
export const newRoom = catchAsyncError(async (req, res) => {
	const room = await Room.create(req.body)
	res.status(200).json({
		success: true,
		message: 'New Room Created',
		room,
	})
})

// get details of a room
export const getSingleRoom = catchAsyncError(async (req, res, next) => {
	// in Next, we use req.query.id instead of req.params.id
	const room = await Room.findById(req.query.id)
	if (!room) {
		return next(new ErrorHandler('Room not found', 404))
	}
	res.status(200).json({
		success: true,
		message: 'Room Details',
		room,
	})
})

//update room details
export const updateRoom = catchAsyncError(async (req, res, next) => {
	const room = await Room.findByIdAndUpdate(req.query.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	})

	if (!room) {
		return next(new ErrorHandler('Room not found', 404))
	}

	res.status(200).json({
		success: true,
		message: 'Room Updated',
	})
})

// delete a room (not using custom error handler for reference)
export const deleteRoom = async (req, res, next) => {
	try {
		const room = await Room.findByIdAndDelete(req.query.id)

		if (!room) {
			return res.status(404).json({
				success: false,
				message: 'Room not found',
			})
		}

		res.status(200).json({
			success: true,
			message: 'Room Deleted',
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}

//POST create a new review => /api/reviews
export const createRoomReview = catchAsyncError(async (req, res, next) => {
	const { rating, comment, roomId } = req.body

	const review = {
		user: req.user.sub,
		name: req.user.name,
		rating: Number(rating),
		comment,
	}

	const room = await Room.findById(roomId)

	// check if the user has already reviewed this particular room
	const hasReviewed = room.reviews.some(
		review => review.user.toString() === req.user.sub.toString()
	)

	if (hasReviewed) {
		// update the review
		room.reviews.forEach(review => {
			// find the review that matches the user and update it
			if (review.user.toString() === req.user.sub.toString()) {
				review.rating = rating
				review.comment = comment
			}
		})
	} else {
		// add the review
		room.reviews.push(review)
		room.numOfReviews = room.reviews.length
	}

	//update the avarage rating
	room.ratings =
		room.reviews.reduce((total, review) => total + review.rating, 0) /
		room.reviews.length

	await room.save({ validateBeforeSave: false })

	res.status(200).json({
		success: true,
	})
})

//GET: check if user can leave a review (they actually booked the room) => /api/reviews/check-review-availability
export const checkReviewAvailability = catchAsyncError(
	async (req, res, next) => {
		const { roomId } = req.query

		const bookings = await Booking.find({
			room: roomId,
			user: req.user.sub,
		})

		let isReviewAvailable = false
		if (bookings.length > 0) {
			isReviewAvailable = true
		}

		res.status(200).json({
			success: true,
			isReviewAvailable,
		})
	}
)
