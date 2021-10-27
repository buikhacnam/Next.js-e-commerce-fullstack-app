import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'

// register user => /api/auth/register
export const registerUser = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body
	const newUser = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: 'PUBLIC_ID',
			url: 'URL',
		},
	})

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
	})
})


