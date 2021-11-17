import nc from 'next-connect'
import dbConnect from '../../config/dbConnect'
import onError from '../../middlewares/error'
import { webhookCheckout } from '../../controllers/paymentControllers'

const handler = nc({ onError })
dbConnect()

// custom config for stripe webhook (raw body)
export const config = {
    api: {
        bodyParser: false,
    }
}

handler.post(webhookCheckout)

export default handler
