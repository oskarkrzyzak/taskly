import { useState, useEffect } from 'react'
import axios from 'axios'

function Sidebar() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            const response = await axios.get('http://127.0.0.1:8000/tasks')
            const allTasks = response.data.data
            const today = new Date().toISOString().split('T')[0]
            const upcoming = allTasks
                .filter(task => task.date >= today && !task.status)
                .sort((a, b) => a.date.localeCompare(b.date))
                .slice(0, 5)
            setTasks(upcoming)
        }
        fetchTasks()
    }, [])

    return (
        <div className="sidebar">
            <h2>Upcoming tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                tasks.map(task => (
                    <div key={task.id} className="sidebar-task">
                        <p className="sidebar-task-title">{task.title}</p>
                        <p className="sidebar-task-date">{task.date}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Sidebar