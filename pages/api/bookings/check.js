import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { checkRoomAvailability } from '../../../controllers/bookingControllers'
import isAuthenticatedUser from '../../../middlewares/auth'

const handler = nc({ onError })

dbConnect()

handler.get(checkRoomAvailability)

export default handler
