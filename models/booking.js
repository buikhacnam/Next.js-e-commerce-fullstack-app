const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
	room: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'Room',
	},
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	checkInDate: {
		type: Date,
		required: true,
	},
	checkOutDate: {
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
	
})
module.exports =
	mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
