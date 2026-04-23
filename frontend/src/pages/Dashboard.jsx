import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Calendar from '../components/Calendar'
import '../styles/Dashboard.css'

function Dashboard() {
    const [tasks, setTasks] = useState([])

    async function fetchTasks() {
        const response = await axios.get('http://127.0.0.1:8000/tasks')
        setTasks(response.data.data)
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="main-content">
                <Sidebar tasks={tasks} />
                <div className="calendar">
                    <Calendar tasks={tasks} onUpdate={fetchTasks} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard