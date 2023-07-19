
import { ADD_USER } from "../actions/actionType"
const initialState = {
    user : null ,
}

export const userReducer = (state = initialState , action) =>{
    switch(action.type){
        case ADD_USER:
            return {
                ...state ,
                user : action.user
            }
            default :
            return state
    }
}