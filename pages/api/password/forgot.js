import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import onError from '../../../middlewares/error'
import { forgetPassword } from '../../../controllers/authControllers'

const handler = nc({ onError })
dbConnect()

handler.post(forgetPassword)

export default handler
