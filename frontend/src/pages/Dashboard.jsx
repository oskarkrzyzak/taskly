import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/Dashboard.css'

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="calendar">
                    <h1>Calendar</h1>
                </div>
            </div>
        </div>
        )
}   

export default Dashboard