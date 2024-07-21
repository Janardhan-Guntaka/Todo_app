import React, { useState } from "react";
import Model from "./Model";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";

const ListItem = ({ task, getData }) => {
    const [showModel, setShowModel] = useState(false);

    const deleteItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateTask = async (id, progress) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progress }),
            });
            if (response.status === 200) {
                getData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <li className="list-item">
            <div className="info-container">
                <TickIcon task={task} updateTask={updateTask} />
                <p className="task-title">{task.title}</p>
            </div>

            <div className="progress-container">
                <ProgressBar progress={task.progress} />
            </div>

            <div className="button-container">
                <button className="edit" onClick={() => setShowModel(true)}>EDIT</button>
                <button className="delete" onClick={deleteItem}>DELETE</button>
                {showModel && <Model mode={'edit'} setShowModel={setShowModel} task={task} getData={getData} />}
            </div>
        </li>
    );
};

export default ListItem;
