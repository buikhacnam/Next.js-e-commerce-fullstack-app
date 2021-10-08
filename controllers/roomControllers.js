import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'

//create a new room 
export const newRoom = catchAsyncError(async (req, res) => {
	const room = await Room.create(req.body)
	res.status(200).json({
		success: true,
		message: 'New Room Created',
		room,
	})
})

// get all rooms
export const allRooms = catchAsyncError(async (req, res) => {
	const rooms = await Room.find({})
	res.status(200).json({
		success: true,
		message: 'All Rooms',
		rooms,
		count: rooms.length,
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
