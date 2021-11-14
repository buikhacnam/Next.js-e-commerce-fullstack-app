import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
import { toast } from 'react-toastify'
import {
	CHECK_BOOKING_REQUEST,
	CHECK_BOOKING_SUCCESS,
	CHECK_BOOKING_FAIL,
	CHECK_BOOKING_RESET,
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
	DELETE_BOOKING_FAIL,
	CLEAR_ERRORS,
} from '../constants/bookingConstants'

export const checkBooking = (
	roomId,
	checkInDate,
	checkOutDate
) => async dispatch => {
	console.log({
		roomId,
		checkInDate,
		checkOutDate,
	})
	dispatch({ type: CHECK_BOOKING_REQUEST })
	try {
		let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
		const { data } = await axios.get(link)

		dispatch({
			type: CHECK_BOOKING_SUCCESS,
			payload: data.isAvailable,
		})
	} catch (error) {
		dispatch({ type: CHECK_BOOKING_FAIL, payload: error.message })
		dispatch({ type: CHECK_BOOKING_RESET })
	}
}

export const getBookedDates = roomId => async dispatch => {
	try {
		const { data } = await axios.get(
			`/api/bookings/check-booked-dates?roomId=${roomId}`
		)
		dispatch({ type: BOOKED_DATES_SUCCESS, payload: data.bookedDates })
	} catch (error) {
		toast.error('loading booked dates failed')
		dispatch({
			type: BOOKED_DATES_FAIL,
			payload: error.response.data.message,
		})
	}
	dispatch({ type: CLEAR_ERRORS })
}

export const myBookings = (authCookie, req) => async dispatch => {
	const { origin } = absoluteUrl(req)

	try {
		const config = {
			headers: {
				cookie: authCookie,
			},
		}
		// dispatch from server, so we need to pass the cookie in the header and send to the server and api url (origin)
		const { data } = await axios.get(`${origin}/api/bookings/me`, config)
		dispatch({ type: MY_BOOKINGS_SUCCESS, payload: data.bookings })
	} catch (error) {
		toast.error('loading my bookings failed')
		dispatch({
			type: MY_BOOKINGS_FAIL,
			payload: error.response.data.message,
		})
	}
	dispatch({ type: CLEAR_ERRORS })
}
