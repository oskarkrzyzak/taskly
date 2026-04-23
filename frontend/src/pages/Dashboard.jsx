import { useState, useEffect } from 'react'
import axios from 'axios'
import supabase from '../supabaseClient'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Calendar from '../components/Calendar'
import '../styles/Dashboard.css'

async function authHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}` }
}

function Dashboard() {
    const [tasks, setTasks] = useState([])

    async function fetchTasks() {
        const response = await axios.get('http://127.0.0.1:8000/tasks', { headers: await authHeaders() })
        setTasks(response.data.data)
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="main-content">
                <Sidebar tasks={tasks} onUpdate={fetchTasks} />
                <div className="calendar">
                    <Calendar tasks={tasks} onUpdate={fetchTasks} />
                </div>
            </div>
        </div>
    )
}


export default Dashboard