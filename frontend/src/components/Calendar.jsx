import { useState } from 'react'
import TaskModal from './TaskModal'
import TaskDetail from './TaskDetail'

function Calendar({ tasks, onUpdate }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)

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

    function getTasksForDay(day) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return tasks.filter(task => task.date === dateStr && !task.status)
    }

    function handleDayClick(day) {
        const dayTasks = getTasksForDay(day)
        setSelectedDay(day)
        if (dayTasks.length > 0) {
            setSelectedTask(dayTasks[0])
            setShowDetail(true)
        } else {
            setShowModal(true)
        }
    }

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
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                        <div className="task-dots">
                            {getTasksForDay(day).map(task => (
                                <span key={task.id} className="task-dot"></span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <TaskModal
                    onClose={() => {
                        setShowModal(false)
                        onUpdate()
                    }}
                    selectedDate={`${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`}
                />
            )}
            {showDetail && selectedTask && (
                <TaskDetail
                    task={selectedTask}
                    onClose={() => setShowDetail(false)}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    )
}

export default Calendar