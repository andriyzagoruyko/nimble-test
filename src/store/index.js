import { createStore } from 'redux';
import trackersReducer from './reducer';

const store = createStore(trackersReducer);

export default store;
