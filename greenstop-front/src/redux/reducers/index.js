import { combineReducers } from 'redux'
import subscriberReducer from './subscribers.js'
import contactReducer from './contacts.js'
import loginReducer from './login.js'
import subscriberlistReducer from './subscriberlist.js'
import messageslistReducer from './messageslist.js'


const todoApp = combineReducers({
 
subscriberReducer,contactReducer,loginReducer,messageslistReducer,subscriberlistReducer

})

export default todoApp