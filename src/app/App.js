import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import 'moment-duration-format';

import useTimer from '../hooks/useTimer';
import actions from '../store/actions';

function App() {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const updateTime = () => dispatch(actions.updateTime());
    const addTracker = (title) => dispatch(actions.addTracker(title));
    const removeTracker = (id) => dispatch(actions.removeTracker(id));
    const toggleTracker = (id) => dispatch(actions.toggleTracker(id));

    const items = useSelector((state) => Object.values(state.items));

    const handleClickAdd = () => addTracker(title);
    const handleClickRemove = (id) => removeTracker(id);
    const handleClickToggle = (id) => toggleTracker(id);

    useTimer(() => updateTime());

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
