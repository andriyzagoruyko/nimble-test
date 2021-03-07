import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/actions';

const selectItems = (state) => Object.values(state.items);

function App() {
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();
    const updateTime = () => dispatch(actions.updateTime());
    const addTracker = (title) => dispatch(actions.addTracker(title));
    const removeTracker = (id) => dispatch(actions.removeTracker(id));
    const toggleActiveTracker = (id) =>
        dispatch(actions.toggleActiveTracker(id));

    const items = useSelector(selectItems);

    const handleClickAdd = () => addTracker(title);
    const handleClickRemove = (id) => removeTracker(id);
    const handleClickToggle = (id) => toggleActiveTracker(id);

    useEffect(() => {
        let time = Date.now();

        const requestID = requestAnimationFrame(function timerTick() {
            const now = Date.now();

            if (now - time > 1000) {
                time = now;
                updateTime();
            }

            requestAnimationFrame(timerTick);
        });

        return () => cancelAnimationFrame(requestID);
    }, []);

    return (
        <main>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={handleClickAdd}>Add</button>
            </div>

            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <span>{item.title}</span>
                        <span>{item.time}</span>
                        <button
                            onClick={() => handleClickToggle(item.id)}
                        >
                            Pause
                        </button>
                        <button
                            onClick={() => handleClickRemove(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
