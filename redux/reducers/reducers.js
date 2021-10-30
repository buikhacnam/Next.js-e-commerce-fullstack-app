import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
import { authReducer } from './userReducers'
const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer
})

export default rootReducer