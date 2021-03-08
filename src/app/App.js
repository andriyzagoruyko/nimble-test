import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTimer from '../hooks/useTimer';
import actions from '../store/actions';
import Tracker from '../components/Tracker/Tracker';
import s from './App.module.scss';
import Logo from '../components/Logo/Logo';
import IconPlay from '../assets/play-filled.svg';

function App() {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const updateTime = () => dispatch(actions.updateTime());
    const addTracker = (title) => dispatch(actions.addTracker(title));
    const removeTracker = (id) => dispatch(actions.removeTracker(id));
    const toggleTracker = (id) => dispatch(actions.toggleTracker(id));

    const items = useSelector((state) => state.items);

    const handleClickRemove = (id) => removeTracker(id);
    const handleClickToggle = (id) => toggleTracker(id);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTracker(title);
    };

    useTimer(() => updateTime());

    return (
        <main className={s.container}>
            <Logo />
            <form
                action="#"
                className={s.form}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Enter tracker name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">
                    <IconPlay />
                </button>
            </form>
            <div className={s.trackers}>
                {items.map((item) => (
                    <Tracker
                        key={item.id}
                        item={item}
                        onToggle={handleClickToggle}
                        onRemove={handleClickRemove}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;
