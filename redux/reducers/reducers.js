import { combineReducers } from 'redux'
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
import { authReducer, loadedUserReducer, updateProfileReducer, forgotPasswordReducer } from './userReducers'
const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    user: updateProfileReducer,
    forgotPassword: forgotPasswordReducer

})

export default rootReducer