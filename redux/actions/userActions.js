import axios from 'axios'
import {
	REGISTER_USER_SUCCESS,
	RESET_PASSWORD_FAIL,
	REGISTER_USER_REQUEST,
	CLEAR_ERRORS,
} from '../constants/userConstants'

// Register User
export const registerUser = (userData, history) => async dispatch => {
	dispatch({ type: REGISTER_USER_REQUEST })
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const { data } = await axios.post(
			'/api/auth/register',
			userData,
			config
		)
		dispatch({ type: REGISTER_USER_SUCCESS })
		// history.push('/login')
	} catch (error) {
		dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data })
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
