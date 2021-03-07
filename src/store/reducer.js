import * as types from './types';

const initialState = {
    items: [],
};

function trackersReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_TRACKER: {
            const { title, createdAt } = action.payload;

            return {
                ...state,
                items: state.items.concat([{ title, createdAt }]),
            };
        }
        default:
            return state;
    }
}

export default trackersReducer;
