import React from 'react';
import s from './Tracker.module.scss';
import IconPlay from '../../assets/play-outline.svg';
import IconPause from '../../assets/pause-outline.svg';
import IconRemove from '../../assets/remove-outline.svg';

function Tracker({ item, onToggle, onRemove }) {
    return (
        <div
            className={`${s.tracker} ${
                item.isActive ? s.active : ''
            }`}
        >
            <span className={s.title}>{item.title}</span>
            <time className={s.time}>{item.time}</time>
            <div className={s.actions}>
                <button onClick={() => onToggle(item.id)}>
                    {item.isActive ? <IconPause /> : <IconPlay />}
                </button>
                <button onClick={() => onRemove(item.id)}>
                    <IconRemove />
                </button>
            </div>
        </div>
    );
}

export default Tracker;
