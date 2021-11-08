import axios from 'axios'
import {
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
	CLEAR_ERRORS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_RESET,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_REQUEST,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_REQUEST,
} from '../constants/userConstants'
import { toast } from 'react-toastify'

// Register User
export const registerUser = userData => async dispatch => {
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
	} catch (error) {
		toast.error(error.response.data.message)
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message,
		})
	}
	dispatch({ type: CLEAR_ERRORS })
}

// load user: load when layout header is loaded
export const loadUser = () => {
	return async dispatch => {
		try {
			dispatch({ type: LOAD_USER_REQUEST })
			const { data } = await axios.get('/api/me')
			dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
		} catch (error) {
			dispatch({
				type: LOAD_USER_FAIL,
				payload: error.response.data.message,
			})
		}
	}
}

// update profile
export const updateProfile = userData => async dispatch => {
	dispatch({ type: UPDATE_PROFILE_REQUEST })
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const { data } = await axios.put('/api/me/update', userData, config)
		toast.success('Update profile successfully!')
		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user })
	} catch (error) {
		toast.error(error.response.data.message)
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		})
	}
	dispatch({ type: UPDATE_PROFILE_RESET })
}

// forgot password
export const forgotPassword = email => async dispatch => {
	dispatch({ type: FORGOT_PASSWORD_REQUEST })
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const { data } = await axios.post('/api/password/forgot', email, config)
		toast.success('Reset password link is sent to ' + email.email)
		// dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
	} catch (error) {
		toast.error(error.response.data.message)
		// dispatch({
		// 	type: FORGOT_PASSWORD_FAIL,
		// 	payload: error.response.data.message,
		// })
	}
	dispatch({ type: CLEAR_ERRORS })
}

// reset password
export const resetPassword = (token, passwords) => async dispatch => {
	dispatch({ type: FORGOT_PASSWORD_REQUEST })
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const { data } = await axios.put(
			`/api/password/reset/${token}`,
			passwords,
			config
		)
		toast.success('Reset password successfully!')
		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message })
	} catch (error) {
		toast.error(error.response.data.message)
		// dispatch({
		// 	type: RESET_PASSWORD_FAIL,
		// 	payload: error.response.data.message,
		// })
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
