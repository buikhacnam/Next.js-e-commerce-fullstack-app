import {
	CHECK_BOOKING_REQUEST,
	CHECK_BOOKING_SUCCESS,
	CHECK_BOOKING_RESET,
	CHECK_BOOKING_FAIL,
	BOOKED_DATES_SUCCESS,
	BOOKED_DATES_FAIL,
	MY_BOOKINGS_SUCCESS,
	MY_BOOKINGS_FAIL,
	BOOKING_DETAILS_SUCCESS,
	BOOKING_DETAILS_FAIL,
	ADMIN_BOOKINGS_REQUEST,
	ADMIN_BOOKINGS_SUCCESS,
	ADMIN_BOOKINGS_FAIL,
	DELETE_BOOKING_REQUEST,
	DELETE_BOOKING_SUCCESS,
	DELETE_BOOKING_RESET,
	DELETE_BOOKING_FAIL,
	CLEAR_ERRORS,
} from '../constants/bookingConstants'

//check booking reducer
export const checkBookingReducer = (
	state = { available: null, loading: false, error: null },
	action
) => {
	switch (action.type) {
		case CHECK_BOOKING_REQUEST:
			return { loading: true }
		case CHECK_BOOKING_SUCCESS:
			return { loading: false, available: action.payload }
		case CHECK_BOOKING_FAIL:
			return { loading: false, error: action.payload }
		case CHECK_BOOKING_RESET:
			return { loading: false, available: null, error: null }
		default:
			return state
	}
}

// get all booked dates reducer
export const bookedDatesReducer = (state = {dates: [], loading: false, error: null}, action) => {
	switch (action.type) {
		case BOOKED_DATES_SUCCESS:
			return {
				loading: false,
				dates: action.payload
			}
		case BOOKED_DATES_FAIL:
			return {
				loading: false,
				error: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state
	}
}
