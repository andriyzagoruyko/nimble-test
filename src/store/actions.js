import * as types from './types';

export const addTracker = (title, createdAt) => ({
    type: types.ADD_TRACKER,
    payload: { title, createdAt },
});

export const removeTracker = (id) => ({
    type: types.REMOVE_TRACKER,
    payload: { id },
});

export const toggleTracker = (id) => ({
    type: types.TOGGLE_ACTIVE,
    payload: { id },
});

export const updateTime = () => ({ type: types.UPDATE_TIME });

export default {
    addTracker,
    removeTracker,
    toggleTracker,
    updateTime,
};
