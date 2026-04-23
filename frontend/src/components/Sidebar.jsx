import { useState } from 'react'
import TaskModal from './TaskModal'

function Sidebar({ tasks, onUpdate }) {
    const [showModal, setShowModal] = useState(false)
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]

    const upcoming = tasks
        .filter(task => task.date >= todayStr && !task.status)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5)

    return (
        <div className="sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Upcoming tasks</h2>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#378ADD',
                        color: 'white',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >+</button>
            </div>
            {upcoming.length === 0 ? (
                <p style={{ color: '#888', fontSize: '14px' }}>No upcoming tasks</p>
            ) : (
                upcoming.map(task => (
                    <div key={task.id} className="sidebar-task">
                        <p className="sidebar-task-title">{task.title}</p>
                        <p className="sidebar-task-date">{task.date}</p>
                    </div>
                ))
            )}
            {showModal && (
                <TaskModal
                    onClose={() => {
                        setShowModal(false)
                        onUpdate()
                    }}
                    selectedDate={todayStr}
                />
            )}
        </div>
    )
}

export default Sidebar