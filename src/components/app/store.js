import {createStore , applyMiddleware}from  'redux'
import mainReducers from '../redux/reducers/combinedReducers'
import reduxThunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(mainReducers ,composeWithDevTools(applyMiddleware(reduxThunk)))

export default store;
