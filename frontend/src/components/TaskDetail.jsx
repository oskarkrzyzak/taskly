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
                <h2>{task.title}</h2>
                <p>Date: {task.date}</p>
                {task.time && <p>Time: {task.time}</p>}
                {task.description && <p>Description: {task.description}</p>}
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status ? 'Done' : 'Pending'}</p>
                <button onClick={markAsDone}>Mark as done</button>
                <button onClick={deleteTask}>Delete</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default TaskDetail