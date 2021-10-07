// localhost:3000/api/rooms/:id
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { getSingleRoom, updateRoom, deleteRoom } from '../../../controllers/roomControllers'

const handler = nc()
dbConnect()

// get single room
handler.get(getSingleRoom)

//update single room
handler.put(updateRoom)

//delete room
handler.delete(deleteRoom)

export default handler