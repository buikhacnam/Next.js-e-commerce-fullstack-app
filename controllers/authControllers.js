import User from '../models/user'
import cloudinary from 'cloudinary'
import catchAsyncErrors from '../middlewares/catchAsyncError'
import catchAsyncError from '../middlewares/catchAsyncError'
import absoluteUrl from 'next-absolute-url'
import ErrorHandler from '../utils/errorHandler'
import sendEmail from '../utils/sendEmail'

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

	await User.create({
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
export const getCurrentUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.sub)
	if (!user) {
		return next(new ErrorHandler(404, 'User not found'))
	}
	res.status(200).json({
		success: true,
		user,
	})
})

// update user profile => /api/me/update
export const updateUserProfile = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.sub)
	if (!user) {
		return next(new ErrorHandler(404, 'User not found'))
	}
	const { name, email, password, avatar } = req.body
	if (name) user.name = name
	if (email) user.email = email
	if (password) user.password = password
	if (avatar) {
		const image_id = user.avatar.public_id

		// Delete user previous image/avatar
		await cloudinary.v2.uploader.destroy(image_id)

		const result = await cloudinary.v2.uploader.upload(avatar, {
			folder: 'cruise/avatars',
			width: '150',
			crop: 'scale',
		})

		user.avatar = {
			public_id: result.public_id,
			url: result.secure_url,
		}
	}

	await user.save()

	res.status(200).json({
		success: true,
		user,
	})
})

// forget password   =>   /api/auth/forgot
export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
	const { origin } = absoluteUrl(req)
	const { email } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		return next(new ErrorHandler('User not found', 404))
	}

	const token = user.generateResetPasswordToken()
	await user.save({ validateBeforeSave: false })

	//create reset password url
	const resetPasswordUrl = `${origin}/password/reset/${token}`

	//send email
	const message = `You are receiving this email because you (or someone else) have requested the reset of a password. 
	Please visit: \n\n ${resetPasswordUrl}`

	try {
		await sendEmail({
			email: user.email,
			subject: 'Reset Password',
			message,
		})
		res.status(200).json({
			success: true,
			message: 'Email sent',
		})
	} catch (error) {
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined
		await user.save({ validateBeforeSave: false })
		return next(new ErrorHandler(error.message, 500))
	}
})
