import musicReducer from './musicSlider';
import accountReducer from './accountSlider';
import stateReducer from './stateSlider';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import stateSlider from './stateSlider';

const rootReducer = combineReducers({
    music: musicReducer,
    account: accountReducer,
    state: stateReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['state'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);
export { store, persistor };
