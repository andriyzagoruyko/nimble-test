import { useEffect } from 'react';

function useTimer(callback, interval = 1000) {
    useEffect(() => {
        let timestamp = Date.now();

        const requestID = requestAnimationFrame(function timerTick() {
            const currentTimestamp = Date.now();

            if (currentTimestamp - timestamp > interval) {
                timestamp = currentTimestamp;

                if (typeof callback === 'function') {
                    callback(timestamp);
                }
            }

            requestAnimationFrame(timerTick);
        });

        return () => cancelAnimationFrame(requestID);
    }, []);
}

export default useTimer;
