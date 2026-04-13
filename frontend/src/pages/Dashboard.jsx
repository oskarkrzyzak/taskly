import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/Dashboard.css'
import Calendar from '../components/Calendar'


function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="calendar">
                    <Calendar />
                </div>
            </div>
        </div>
        )
}   

export default Dashboard