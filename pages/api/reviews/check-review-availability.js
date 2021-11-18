import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { checkReviewAvailability } from '../../../controllers/roomControllers'
import isAuthenticatedUser from '../../../middlewares/auth'

const handler = nc({ onError })
dbConnect()

handler.use(isAuthenticatedUser).get(checkReviewAvailability)

export default handler
