import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import trackersReducer from './reducer';
import { TimeTransform } from './transforms';

const persistConfig = {
    key: 'trackers',
    storage: storage,
    whitelist: ['items'],
    transforms: [TimeTransform],
};

const reducer = persistReducer(persistConfig, trackersReducer);
const store = createStore(reducer);
const persistor = persistStore(store);

export { persistor, store };
