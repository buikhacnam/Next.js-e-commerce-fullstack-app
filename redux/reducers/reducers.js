import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
import { authReducer, loadedUserReducer } from './userReducers'
const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
})

export default rootReducer