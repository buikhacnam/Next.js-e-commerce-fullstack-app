import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { newBooking } from '../../../controllers/bookingControllers'
import isAuthenticatedUser from '../../../middlewares/auth'

const handler = nc({ onError })

dbConnect()

handler.use(isAuthenticatedUser).post(newBooking)

export default handler
