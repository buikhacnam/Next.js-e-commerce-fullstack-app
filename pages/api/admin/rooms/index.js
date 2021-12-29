// localhost:3000/api/rooms
import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import { allAdminRooms } from '../../../../controllers/roomControllers'
import onError from '../../../../middlewares/error'
import isAuthenticatedUser, {
	authorizeRoles,
} from '../../../../middlewares/auth'

const handler = nc({ onError })
dbConnect()

// ADMIN get all rooms
handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminRooms)

export default handler
