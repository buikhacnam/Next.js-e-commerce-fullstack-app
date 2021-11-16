import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import isAuthenticatedUser from '../../../middlewares/auth'
import { stripeCheckoutSession } from '../../../controllers/paymentControllers'

const handler = nc({ onError })
dbConnect()

handler.use(isAuthenticatedUser).get(stripeCheckoutSession)

export default handler
