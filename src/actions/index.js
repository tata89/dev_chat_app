import { CLEAR_USER, SET_USER } from "./types"

export const setUser = user => {
    return {
        type: SET_USER,
        payload: {
            currentuser: user
        }
    }
}
export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}