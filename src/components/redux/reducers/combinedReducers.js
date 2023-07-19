import articleReducer from "./articleReducer";
import { userReducer } from "./userReducer";
import { combineReducers } from "redux";

const  mainReducers = combineReducers({
    userPage : userReducer ,
    articleState : articleReducer
})
export default mainReducers ;