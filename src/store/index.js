import { INITIAL_STATE, reducer } from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export function configureStore() {
    let store = createStore(persistedReducer, INITIAL_STATE, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}
