const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
			required: true,
		},
		checkingDate: {
			type: Date,
			required: true,
		},
		checkoutDate: {
			type: Date,
			required: true,
		},
		amountPaid: {
			type: Number,
			required: true,
		},
		daysOfStay: {
			type: Number,
			required: true,
		},
		paymentInfo: {
			id: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
		},
		paidAt: {
			type: Date,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
module.exports =
	mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
