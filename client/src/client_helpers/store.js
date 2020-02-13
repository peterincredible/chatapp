import {messagesReducer,userReducer} from "./reducer";
import thunk from 'redux-thunk';
import {applyMiddleware,createStore,combineReducers} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

export let store = createStore(combineReducers({user:userReducer,messages:messagesReducer}),composeWithDevTools(applyMiddleware(thunk),));

