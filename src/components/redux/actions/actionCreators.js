
import * as actions from './actionType'
 export const addUser = (payload) =>{
   return {
     type : actions.ADD_USER ,
     user : payload ,
   }
}

export const setLoading = (status) =>{
  return{
    type : actions.SET_LOADING_STATUS ,
    status : status ,
  }
}

export const AddArticle = (article) =>{
  return {
    type : actions.ADD_ARTICLE ,
    articles  : article
  }
}
