import { useState } from 'react'
import TaskModal from './TaskModal'
import axios from 'axios'
import supabase from '../supabaseClient'

async function authHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}` }
}

function DayPanel({ day, month, year, tasks, onClose, onUpdate }) {
    const [showAddModal, setShowAddModal] = useState(false)

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    
    const dayTasks = tasks
        .filter(task => task.date === dateStr && !task.status)
        .sort((a, b) => {
            if (!a.time) return 1
            if (!b.time) return -1
            return a.time.localeCompare(b.time)
        })

    const date = new Date(year, month, day)
    const dateLabel = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    })

    async function markAsDone(task) {
        await axios.put(`http://127.0.0.1:8000/tasks/${task.id}`, {
            ...task,
            status: true
        }, { headers: await authHeaders() })
        onUpdate()
    }

    async function deleteTask(task) {
        await axios.delete(`http://127.0.0.1:8000/tasks/${task.id}`, { headers: await authHeaders() })
        onUpdate()
    }

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal" onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: '600' }}>{dateLabel}</h2>
                        <button onClick={onClose} style={{
                            border: 'none',
                            background: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#888'
                        }}>×</button>
                    </div>

                    {dayTasks.length === 0 ? (
                        <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>No tasks for this day</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                            {dayTasks.map(task => (
                                <div
                                    key={task.id}
                                    style={{
                                        padding: '12px',
                                        border: '1px solid #f0f0f0',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                        <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>{task.title}</p>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '11px',
                                            backgroundColor: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef9c3' : '#dcfce7',
                                            color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#ca8a04' : '#16a34a'
                                        }}>{task.priority}</span>
                                    </div>
                                    {task.time && (
                                        <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#666' }}>🕐 {task.time}</p>
                                    )}
                                    {task.description && (
                                        <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#666' }}>{task.description}</p>
                                    )}
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                        <button
                                            onClick={() => markAsDone(task)}
                                            style={{
                                                flex: 1,
                                                padding: '6px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: '#16a34a',
                                                color: 'white',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >✓ Done</button>
                                        <button
                                            onClick={() => deleteTask(task)}
                                            style={{
                                                flex: 1,
                                                padding: '6px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: '#dc2626',
                                                color: 'white',
                                                fontSize: '12px',
                                                cursor: 'pointer'
                                            }}
                                        >Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setShowAddModal(true)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px dashed #378ADD',
                            background: 'none',
                            color: '#378ADD',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >+ Add task</button>
                </div>
            </div>

            {showAddModal && (
                <TaskModal
                    onClose={() => {
                        setShowAddModal(false)
                        onUpdate()
                    }}
                    selectedDate={dateStr}
                />
            )}
        </>
    )
}

export default DayPanel