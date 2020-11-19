import { combineReducers } from "redux"
import { SET_USER } from "../actions/types"
const initialUserState = {
    currentuser: null,
    isloading: true,
}
const userreducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                currentuser: action.payload.currentuser,
                isloading: false
            }
        case 'CLEAR_USER':
            return {
                ...state,
                isloading: false
            }
        default:
            return state

    }
}
const rootReducers = combineReducers({
    user: userreducer
})
export default rootReducers