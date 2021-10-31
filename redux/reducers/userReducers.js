import {
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	CLEAR_ERRORS,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
} from '../constants/userConstants'

//Auth reducer

export const authReducer = (state = { loading: false, error: null, success: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case REGISTER_USER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				error: null,
				success: null,
			}
		default:
			return state
	}
}

// Load user
export const loadedUserReducer = (state = { loading: false, error: null, success: null, user: null }, action) => {
	switch (action.type) {
		case LOAD_USER_SUCCESS:
			return {
				loading: false,
				success: true,
				user: action.payload,
			}
		case LOAD_USER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case LOAD_USER_REQUEST:
			return {
				loading: true,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				error: null,
				success: null,
			}
		default:
			return state
	}
}
