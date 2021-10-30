import {
	ALL_ROOMS_SUCCESS,
	ALL_ROOMS_FAIL,
	CLEAR_ERRORS,
	ROOM_DETAILS_SUCCESS,
	ROOM_DETAILS_FAIL,
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
