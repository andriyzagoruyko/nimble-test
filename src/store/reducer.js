import * as types from './types';

import moment from 'moment';

import 'moment-duration-format';

const initialState = {
    items: {},
};

function trackersReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_TRACKER: {
            const {
                id = Object.keys(state.items).length,
                title,
            } = action.payload;

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: {
                        id,
                        title,
                        time: '00:00:00',
                        seconds: 0,
                        timestamp: Date.now(),
                        isActive: true,
                    },
                },
            };
        }

        case types.REMOVE_TRACKER: {
            const items = Object.values(state.items).filter(
                (item) => item.id !== action.payload.id,
            );

            return { ...state, items };
        }

        case types.TOGGLE_ACTIVE: {
            const { id } = action.payload;
            const item = state.items[id];
            const isActive = !item.isActive;
            const timestamp = isActive ? Date.now() : item.timestamp;

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: { ...item, timestamp, isActive },
                },
            };
        }

        case types.UPDATE_TIME: {
            const items = Object.values(state.items).map((item) => {
                if (item.isActive) {
                    const seconds = item.seconds + 1;
                    const time = moment
                        .duration(seconds, 'seconds')
                        .format('hh:mm:ss', {
                            trim: false,
                        });

                    return { ...item, seconds, time };
                }

                return item;
            });

            return { ...state, items };
        }

        default:
            return state;
    }
}

export default trackersReducer;
