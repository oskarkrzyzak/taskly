import axios from 'axios'

function TaskDetail({ task, onClose, onUpdate }) {

    async function markAsDone() {
        await axios.put(`http://127.0.0.1:8000/tasks/${task.id}`, {
            ...task,
            status: true
        })
        onUpdate()
        onClose()
    }

    async function deleteTask() {
        await axios.delete(`http://127.0.0.1:8000/tasks/${task.id}`)
        onUpdate()
        onClose()
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{task.title}</h2>
                    <button onClick={onClose} style={{
                        border: 'none',
                        background: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: '#888'
                    }}>×</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#666' }}>📅 {task.date}</p>
                    {task.time && <p style={{ fontSize: '14px', color: '#666' }}>🕐 {task.time}</p>}
                    {task.description && <p style={{ fontSize: '14px', color: '#444' }}>{task.description}</p>}
                    <p style={{ fontSize: '14px' }}>
                        Priority: <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            backgroundColor: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef9c3' : '#dcfce7',
                            color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#ca8a04' : '#16a34a'
                        }}>{task.priority}</span>
                    </p>
                    <p style={{ fontSize: '14px' }}>
                        Status: <span style={{ color: task.status ? '#16a34a' : '#888' }}>
                            {task.status ? 'Done ✓' : 'Pending'}
                        </span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {!task.status && (
                        <button onClick={markAsDone} style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#16a34a',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>Mark as done ✓</button>
                    )}
                    <button onClick={deleteTask} style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#dc2626',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>Delete</button>
                    <button onClick={onClose} style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        background: 'white',
                        fontSize: '14px'
                    }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default TaskDetail