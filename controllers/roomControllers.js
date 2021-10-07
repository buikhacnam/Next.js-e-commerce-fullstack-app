import Room from '../models/room'

// get all rooms
export const allRooms = async (req, res) => {
    let rooms
	try {
		rooms = await Room.find({})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}

	res.status(200).json({
		success: true,
		message: 'All Rooms',
        rooms,
        count: rooms.length
	})
}

//create a new room
export const newRoom = async (req, res) => {
	try {
		const room = await Room.create(req.body)
		res.status(200).json({
			success: true,
			message: 'New Room Created',
			room,
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}

// get details of a room
export const getSingleRoom = async (req, res) => {
	try {
		// in Next, we use req.query.id instead of req.params.id
		const room = await Room.findById(req.query.id)

		if(!room) {
			return res.status(404).json({
				success: false,
				message: 'Room not found',
			})
		}

		res.status(200).json({
			success: true,
			message: 'Room Details',
			room,
		})
	} catch(error) {
		res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}

//update room details
export const updateRoom = async (req, res) => {
	try {
		const room = await Room.findByIdAndUpdate(req.query.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		})

		if(!room) {
			return res.status(404).json({
				success: false,
				message: 'Room not found',
			})
		}

		res.status(200).json({
			success: true,
			message: 'Room Updated',
		})

	} catch(error) {
		res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}

// delete a room
export const deleteRoom = async (req, res) => {
	try {
		const room = await Room.findByIdAndDelete(req.query.id)

		if(!room) {
			return res.status(404).json({
				success: false,
				message: 'Room not found',
			})
		}

		res.status(200).json({
			success: true,
			message: 'Room Deleted',
		})

	} catch(error) {
		res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}