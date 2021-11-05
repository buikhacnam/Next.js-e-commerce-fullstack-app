import {
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	CLEAR_ERRORS,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_RESET,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_REQUEST,
} from '../constants/userConstants'

//Auth reducer

export const authReducer = (
	state = { loading: false, error: null, success: null },
	action
) => {
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
			console.log('clear error auth')
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
export const loadedUserReducer = (
	state = { loading: false, error: null, success: null, user: null },
	action
) => {
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
			console.log('clear error loadedUser')
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

// User update profile reducer
export const updateProfileReducer = (
	state = { loading: false, error: null, success: null, isUpdated: null },
	action
) => {
	switch (action.type) {
		case UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				success: true,
				isUpdated: action.payload,
			}
		case UPDATE_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case UPDATE_PROFILE_REQUEST:
			return {
				loading: true,
			}
		case UPDATE_PROFILE_RESET:
			return {
				...state,
				loading: false,
				error: null,
				success: null,
				isUpdated: null,
			}
		default:
			return state
	}
}

// forgot password reducer
export const forgotPasswordReducer = (
	state = { loading: false, error: null, success: null },
	action
) => {
	switch (action.type) {
		case FORGOT_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			}
		case FORGOT_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case FORGOT_PASSWORD_REQUEST:
			return {
				loading: true,
			}
		case CLEAR_ERRORS:
			console.log('clear errors forget password')
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
