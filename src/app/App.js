import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/actions';

function App() {
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();
    const addTracker = (title, createdAt) =>
        dispatch(actions.addTracker(title, createdAt));

    const items = useSelector((state) => state.items);

    const handleClickAdd = () => {
        addTracker(title, Date.now());
    };

    console.log(items);

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
        </main>
    );
}

export default App;
