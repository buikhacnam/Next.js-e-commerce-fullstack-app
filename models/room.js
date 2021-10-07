const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please enter room name'],
		trimq: true,
		maxlength: [100, 'room name must be less than 100 characters'],
	},
	pricePernight: {
		type: Number,
		required: [true, 'please enter room price'],
		maxlength: [4, 'room price must be less than 4 characters'],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, 'please enter room description'],
	},
	address: {
		type: String,
		required: [true, 'please enter room address'],
	},
	guestCapacity: {
		type: Number,
		required: [true, 'please enter room guest capacity'],
	},
	numOfBeds: {
		type: Number,
		required: [true, 'please enter room number of beds'],
	},
	internet: {
		type: Boolean,
		default: false,
	},
	breakfast: {
		type: Boolean,
		default: false,
	},
	airConditioned: {
		type: Boolean,
		default: false,
	},
	pestAllowed: {
		type: Boolean,
		default: false,
	},
	roomCleaning: {
		type: Boolean,
		default: false,
	},
	ratings: {
		type: Number,
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, 'please enter room category'],
		enum: {
			values: ['King', 'Single', 'Twins'],
		},
		message: 'please select correct category for room',
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
        required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema)
