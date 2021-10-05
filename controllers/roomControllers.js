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
