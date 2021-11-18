import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_RESET,
	NEW_REVIEW_FAIL,
	REVIEW_AVAILABILITY_REQUEST,
	REVIEW_AVAILABILITY_SUCCESS,
	REVIEW_AVAILABILITY_FAIL,
	ADMIN_ROOMS_REQUEST,
	ADMIN_ROOMS_SUCCESS,
	ADMIN_ROOMS_FAIL,
	NEW_ROOM_REQUEST,
	NEW_ROOM_SUCCESS,
	NEW_ROOM_RESET,
	NEW_ROOM_FAIL,
	UPDATE_ROOM_REQUEST,
	UPDATE_ROOM_SUCCESS,
	UPDATE_ROOM_RESET,
	UPDATE_ROOM_FAIL,
	DELETE_ROOM_REQUEST,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_RESET,
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

const initialState = { rooms: [] }
export const allRoomsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALL_ROOMS_SUCCESS:
			return {
				roomsCount: action.payload.roomsCount,
				resPerPage: action.payload.resPerPage,
				filteredRoomsCount: action.payload.filteredRoomsCount,
				rooms: action.payload.rooms,
			}
		case ALL_ROOMS_FAIL:
			return {
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			return state
	}
}

//Room details reducer
export const roomDetailsReducer = (state = { room: {} }, action) => {
	switch (action.type) {
		case ROOM_DETAILS_SUCCESS:
			return {
				room: action.payload,
			}
		case ROOM_DETAILS_FAIL:
			return {
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			return state
	}
}

// New Review reducer
export const newReviewReducer = (
	state = { review: {}, loading: false },
	action
) => {
	switch (action.type) {
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				review: action.payload,
			}
		case NEW_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case NEW_REVIEW_RESET:
			return {
				review: {},
				error: null,
				loading: false,
			}
		default:
			return state
	}
}

// Review availability reducer
export const checkReviewReducer = (
	state = { reviewAvailable: null, loading: false, error: null },
	action
) => {
	switch (action.type) {
		case REVIEW_AVAILABILITY_REQUEST:
			return {
				loading: true,
			}

		case REVIEW_AVAILABILITY_SUCCESS:
			return {
				reviewAvailable: action.payload,
				loading: false,
			}
		case REVIEW_AVAILABILITY_FAIL:
			return {
				error: action.payload,
				loading: false,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			return state
	}
}
