import { combineReducers } from 'redux'
import {
	allRoomsReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
} from './roomReducers'
import {
	authReducer,
	loadedUserReducer,
	updateProfileReducer,
	forgotPasswordReducer,
	resetPasswordReducer,
} from './userReducers'
import {
	checkBookingReducer,
	bookedDatesReducer,
	bookingsReducer,
	bookingDetailsReducer,
} from './bookingReducers'
const rootReducer = combineReducers({
	//room
	allRooms: allRoomsReducer,
	roomDetails: roomDetailsReducer,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,

	//auth & user
	auth: authReducer,
	loadedUser: loadedUserReducer,
	user: updateProfileReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,

	//booking
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: bookingsReducer,
	bookingDetails: bookingDetailsReducer,
})

export default rootReducer
