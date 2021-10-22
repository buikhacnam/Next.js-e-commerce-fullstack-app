import axios from 'axios'
import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	CLEAR_ERRORS,
} from '../constants/roomConstants'
import absoluteUrl from 'next-absolute-url'

// Get all rooms
export const getAllRooms = req => {
	return dispatch => {
		try {
			const { origin } = absoluteUrl(req) // get the origin of the app
			const { data } = axios.get(`${origin}/api/rooms`)
			dispatch({
				type: ALL_ROOMS_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: ALL_ROOMS_FAIL,
				payload: error.response.data.message,
			})
		}
	}
}

// clear errors
export const clearErrors = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_ERRORS,
		})
	}
}
