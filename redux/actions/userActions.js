import axios from 'axios'
import {
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	CLEAR_ERRORS,
} from '../constants/userConstants'
import { toast } from 'react-toastify'

// Register User
export const registerUser = (userData) => async dispatch => {
	console.log('history', history)
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
		toast.success('Register account successfully!')
		dispatch({ type: REGISTER_USER_SUCCESS })
		dispatch({ type: CLEAR_ERRORS })
	} catch (error) {
		toast.error(error.response.data.message)
		dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
		dispatch({ type: CLEAR_ERRORS })
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
