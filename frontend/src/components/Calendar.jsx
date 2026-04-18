import { useState } from 'react'
import TaskModal from './TaskModal'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    
    function prevMonth() {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() - 1)
        setCurrentDate(newDate)
    }
    
    function nextMonth() {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() + 1)
        setCurrentDate(newDate)
    }
    
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
    const emptyDays = Array.from({ length: startingDay }, (_, i) => i)

    return (
        <div>
            <h2>{currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={prevMonth}>{"<"}</button>
            <button onClick={nextMonth}>{">"}</button>
            <div className="calendar-grid">
                {weekDays.map(day => (
                    <div key={day} className="calendar-cell">
                        {day}
                    </div>
                ))}
                {emptyDays.map(i => (
                    <div key={`empty-${i}`} className="calendar-cell empty"></div>
                ))}
                {days.map(day => (
                    <div 
                        key={day} 
                        className="calendar-cell"
                        onClick={() => {
                            setSelectedDay(day)
                            setShowModal(true)
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>
            {showModal && (
                <TaskModal 
                    onClose={() => setShowModal(false)}
                    selectedDate={`${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`}
                />
            )}
        </div>
    ) 
}

export default Calendar