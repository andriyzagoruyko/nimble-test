import * as types from './types';

export const addTracker = (title, createdAt) => ({
    type: types.ADD_TRACKER,
    payload: { title, createdAt },
});

export default { addTracker };
