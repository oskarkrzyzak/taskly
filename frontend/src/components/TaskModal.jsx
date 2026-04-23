import { useState } from 'react'
import axios from 'axios'
import supabase from '../supabaseClient'

async function authHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}` }
}

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
        }, { headers: await authHeaders() })
        onClose()
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>New Task</h2>
                    <button onClick={onClose} style={{
                        border: 'none',
                        background: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: '#888'
                    }}>×</button>
                </div>
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
                    placeholder="Description (optional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ resize: 'none', height: '80px' }}
                />
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="low">Low priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="high">High priority</option>
                </select>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={onClose} style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        background: 'white',
                        fontSize: '14px'
                    }}>Cancel</button>
                    <button onClick={saveTask} style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#378ADD',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>Save Task</button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal