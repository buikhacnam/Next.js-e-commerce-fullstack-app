import {
	REGISTER_USER_SUCCESS,
	RESET_PASSWORD_FAIL,
	REGISTER_USER_REQUEST,
	CLEAR_ERRORS,
} from '../constants/userConstants'

//Auth reducer

export const authReducer = (state = { loading: false, user: null }, action) => {
	switch (action.type) {
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case RESET_PASSWORD_FAIL:
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
				user: null,
			}
		default:
			return state
	}
}
