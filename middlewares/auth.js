import catchAsyncError from './catchAsyncError'
import ErrorHandler from '../utils/errorHandler'
import { getSession } from 'next-auth/client' // get Session from http://localhost:3000/api/auth/session

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
	const session = await getSession({ req })
	console.log('session', session)
	if (!session) {
		return next(new ErrorHandler('Not authorized 11111111', 401))
	}
	req.user = session.user
	next()
})

export default isAuthenticatedUser

// handling user roles
export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.user.role)) {
			return next(
				new ErrorHandler(`Role (${req.user.user.role} is not allowed)`, 403)
			)
		}
		next()
	}
}

let session = {
	user: {
		name: 'nam',
		email: 'nam@nam.com',
		sub: '6179de90b970eecc15379bf2',
		user: {
			avatar: [Object],
			_id: '6179de90b970eecc15379bf2',
			name: 'nam',
			email: 'nam@nam.com',
			password:
				'$2a$10$rvsJZqtsEbYMUzQVxOaQke8iLr.DF3vtkKHVsaoZIxxxWWUwa/I2a',
			createdAt: '2021-10-27T23:19:44.034Z',
			__v: 0,
		},
		iat: 1635637279,
		exp: 1638229279,
	},
	expires: '2021-11-29T23:41:28.495Z',
}
