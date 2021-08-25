import { defaultState, reducer } from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default createStore(reducer, defaultState, applyMiddleware(thunk))