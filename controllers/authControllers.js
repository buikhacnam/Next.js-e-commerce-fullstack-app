import User from '../models/user'
import cloudinary from 'cloudinary'

import catchAsyncErrors from '../middlewares/catchAsyncError'

// Setting up cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Register user   =>   /api/auth/register
export const registerUser = catchAsyncErrors(async (req, res) => {
	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'cruise/avatars',
		width: '150',
		crop: 'scale',
	})

	const { name, email, password } = req.body

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	})

	res.status(200).json({
		success: true,
		message: 'Account Registered successfully',
	})
})


// Current User profile   =>   /api/auth/me
export const getCurrentUser = catchAsyncErrors(async (req, res) => {
	const user = await User.findById(req.user.sub)
	res.status(200).json({
		success: true,
		user,
	})
})