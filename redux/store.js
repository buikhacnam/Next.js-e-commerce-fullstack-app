import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers/reducers'

const bindMiddleware = middleware => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension')
		return composeWithDevTools(applyMiddleware(...middleware))
	}
	return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		}
		if (state.count) nextState.count = state.count // preserve count value on client side navigation
		return nextState
	} else {
		return rootReducer(state, action)
	}
}

const initStore = () => {
	return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore, { debug: true })
