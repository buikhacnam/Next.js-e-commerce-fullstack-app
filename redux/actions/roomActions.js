import axios from 'axios'
import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAIL,
	CLEAR_ERRORS,
} from '../constants/roomConstants'
import absoluteUrl from 'next-absolute-url'

// Get all rooms
export const getAllRooms = (req, query) => {
	return async dispatch => {
		try {
			const { origin } = absoluteUrl(req) // get the origin of the app
			let url = `${origin}/api/rooms?page=${query?.page || 1}&location=${query?.location || ''}`
			if(query?.guests) url += `&guestCapacity=${query.guests}`
			if(query?.category) url += `&category=${query.category}`
			const { data } = await axios.get(url)
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

// Get room details
export const getRoomDetails = (req, id) => {
	return async dispatch => {
		try {
			const { origin } = absoluteUrl(req) // get the origin of the app
			const { data } = await axios.get(`${origin}/api/rooms/${id}`)
			dispatch({
				type: ROOM_DETAILS_SUCCESS,
				payload: data.room,
			})
		} catch (error) {
			toast.error(error.response.data.message)
			// dispatch({
			// 	type: ROOM_DETAILS_FAIL,
			// 	payload: error.response.data.message,
			// })
		}
		dispatch({type: CLEAR_ERRORS})
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
