import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'
import cloudinary from 'cloudinary'

// Set up cloudinary
cloudinary.config({
	cloudinary_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET	
})

// register user => /api/auth/register
export const registerUser = catchAsyncError(async (req, res, next) => {
	const resultMedia = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'cruise/avatars',
		width: '150',
		crop: 'scale'
	})

	const { name, email, password } = req.body
	const newUser = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: resultMedia.public_id,
			url: resultMedia.secure_url,
		},
	})

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
	})
})


