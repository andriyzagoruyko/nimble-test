import moment from 'moment';
import 'moment-duration-format';
import * as types from './types';

const initialState = {
    items: {},
};

function trackersReducer(state = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case types.ADD_TRACKER: {
            const id = Object.keys(state.items).length;
            const updatedAt = Date.now();
            const title = !payload.title
                ? moment(updatedAt).format('MM/DD/YYYY hh:mm')
                : payload.title;

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: {
                        id,
                        title,
                        updatedAt,
                        time: '00:00:00',
                        seconds: 0,
                        isActive: true,
                    },
                },
            };
        }

        case types.REMOVE_TRACKER: {
            const items = Object.values(state.items).filter(
                (item) => item.id !== payload.id,
            );

            return { ...state, items };
        }

        case types.TOGGLE_ACTIVE: {
            const { id } = payload;
            const item = state.items[id];
            const isActive = !item.isActive;

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
                    const updatedAt = Date.now();
                    const seconds = item.seconds + 1;
                    const time = moment
                        .duration(seconds, 'seconds')
                        .format('hh:mm:ss', { trim: false });

                    return { ...item, seconds, time, updatedAt };
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
