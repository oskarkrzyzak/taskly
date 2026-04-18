import { useState } from 'react'

function TaskModal({ onClose, selectedDate }) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('low')

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
                <button>Save Task</button>
            </div>
        </div>
    )
}

export default TaskModal