// localhost:3000/api/rooms
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { allRooms, newRoom } from '../../../controllers/roomControllers'

const handler = nc()
dbConnect()

// get all rooms
handler.get(allRooms)

// create a new room
handler.post(newRoom)
export default handler