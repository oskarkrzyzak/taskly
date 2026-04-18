import { useState } from 'react'
import axios from 'axios'

function TaskModal({ onClose, selectedDate }) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('low')

    async function saveTask() {
    await axios.post('http://127.0.0.1:8000/tasks', {
        title: title,
        date: selectedDate,
        time: time ? time + ':00' : null,
        description: description || null,
        priority: priority,
        status: false
    })
    onClose()
}
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Task</h2>
                <button onClick={onClose}>X</button>
                <input 
                    type="text" 
                    placeholder="Task title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input 
                    type="date" 
                    value={selectedDate} 
                />
                <input 
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button onClick={saveTask}>Save Task</button>
            </div>
        </div>
    )
}

export default TaskModal