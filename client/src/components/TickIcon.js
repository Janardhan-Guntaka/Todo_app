import React, { useState, useEffect } from 'react';

const TickIcon = ({ task, updateTask }) => {
    const [checked, setChecked] = useState(task.progress === 100);

    useEffect(() => {
        setChecked(task.progress === 100);
    }, [task.progress]);

    const handleCheckboxChange = async () => {
        const newProgress = checked ? 0 : 100;
        setChecked(!checked);
        updateTask(task.id, newProgress);
    };

    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={`checkbox-${task.id}`}
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={`checkbox-${task.id}`}></label>
        </div>
    );
};

export default TickIcon;
