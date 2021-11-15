import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
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
	allRooms: allRoomsReducer,
	roomDetails: roomDetailsReducer,
	auth: authReducer,
	loadedUser: loadedUserReducer,
	user: updateProfileReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: bookingsReducer,
	bookingDetails: bookingDetailsReducer,
})

export default rootReducer
