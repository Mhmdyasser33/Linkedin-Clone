import * as actions from '../actions/actionType'
const initialState = {
  loading : false ,
  articles : [] ,
}

const articleReducer = (state = initialState , action) =>{
   switch(action.type){
    case actions.SET_LOADING_STATUS:
    return {
        ...state ,
       loading : action.status
    }
    case actions.ADD_ARTICLE:
     return {
        ...state  ,
       articles : action.articles
     }
     default :
     return state
   }
}

export default articleReducer ;