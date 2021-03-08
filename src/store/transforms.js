import moment from 'moment';
import { createTransform } from 'redux-persist';

const TimeTransform = createTransform(
    (inboundState) => inboundState,
    (outboundState) => {
        return outboundState.map((item) => {
            if (item.isActive) {
                const seconds = moment(Date.now())
                    .add(item.seconds, 'seconds')
                    .diff(item.updatedAt, 'seconds', true);

                const time = moment
                    .duration(seconds, 'seconds')
                    .format('hh:mm:ss', { trim: false });

                return { ...item, time, seconds };
            }

            return item;
        });
    },
    { whitelist: ['items'] },
);

export { TimeTransform };
