import axios from 'axios'
import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_RESET,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	REVIEW_AVAILABILITY_FAIL,
	ADMIN_ROOMS_REQUEST,
	ADMIN_ROOMS_SUCCESS,
	ADMIN_ROOMS_FAIL,
	NEW_ROOM_REQUEST,
	NEW_ROOM_SUCCESS,
	NEW_ROOM_FAIL,
	UPDATE_ROOM_REQUEST,
	UPDATE_ROOM_SUCCESS,
	UPDATE_ROOM_FAIL,
	DELETE_ROOM_REQUEST,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_FAIL,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_RESET,
	DELETE_REVIEW_FAIL,
	CLEAR_ERRORS,
} from '../constants/roomConstants'
import absoluteUrl from 'next-absolute-url'
import { toast } from 'react-toastify'

// Get all rooms
export const getAllRooms = (req, query) => {
	return async dispatch => {
		try {
			const { origin } = absoluteUrl(req) // get the origin of the app
			let url = `${origin}/api/rooms?page=${query?.page || 1}&location=${
				query?.location || ''
			}`
			if (query?.guests) url += `&guestCapacity=${query.guests}`
			if (query?.category) url += `&category=${query.category}`
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
		dispatch({ type: CLEAR_ERRORS })
	}
}

//PUT: new review
export const newReview = reviewData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		dispatch({ type: NEW_REVIEW_REQUEST })
		const { data } = await axios.put('/api/reviews', reviewData, config)
		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data.review,
		})
		toast.success('Thanks for your feedback!')
	} catch (error) {
		toast.error(error.response.data.message)
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error.response.data.message,
		})
	}
	dispatch({ type: NEW_REVIEW_RESET })
}

//GET: check review availability
export const checkReviewAvailability = roomId => async dispatch => {
	try {
		dispatch({ type: REVIEW_AVAILABILITY_REQUEST })
		const { data } = await axios.get(
			`/api/reviews/check-review-availability?roomId=${roomId}`
		)

		dispatch({
			type: REVIEW_AVAILABILITY_SUCCESS,
			payload: data.isReviewAvailable,
		})
	} catch (error) {
		dispatch({
			type: REVIEW_AVAILABILITY_FAIL,
			payload: error.response.data.message,
		})
	}
	dispatch({ type: CLEAR_ERRORS })
}

// clear errors
export const clearErrors = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_ERRORS,
		})
	}
}
