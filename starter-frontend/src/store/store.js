import { legacy_createStore as createStore, combineReducers } from 'redux'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    userModule : userReducer
})

export const store = createStore(rootReducer)