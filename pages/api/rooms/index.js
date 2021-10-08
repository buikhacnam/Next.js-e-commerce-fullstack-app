// localhost:3000/api/rooms
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { allRooms, newRoom } from '../../../controllers/roomControllers'
import onError from '../../../middlewares/error'

const handler = nc({ onError })
dbConnect()

// get all rooms
handler.get(allRooms)

// create a new room
handler.post(newRoom)
export default handler