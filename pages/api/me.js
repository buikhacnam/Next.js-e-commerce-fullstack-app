import nc from 'next-connect'
import dbConnect from '../../config/dbConnect'
import onError from '../../middlewares/error'
import { getCurrentUser } from '../../controllers/authControllers'
import isAuthenticatedUser from '../../middlewares/auth'

const handler = nc({ onError })
dbConnect()

handler.use(isAuthenticatedUser).get(getCurrentUser)

export default handler
