import { useState } from 'react'
import TaskModal from './TaskModal'
import TaskDetail from './TaskDetail'

function Calendar({ tasks, onUpdate }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)

    const today = new Date()

    function isToday(day) {
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
    }

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <button onClick={prevMonth} style={{
                    border: '1px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>‹</button>
                <h2 style={{ fontSize: '20px', fontWeight: '600', minWidth: '160px' }}>
                    {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={nextMonth} style={{
                    border: '1px solid #e0e0e0',
                    background: 'white',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>›</button>
            </div>
            <div className="calendar-grid">
                {weekDays.map(day => (
                    <div key={day} style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#888',
                        padding: '8px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {day}
                    </div>
                ))}
                {emptyDays.map(i => (
                    <div key={`empty-${i}`} className="calendar-cell empty"></div>
                ))}
                {days.map(day => (
                    <div
                        key={day}
                        className={`calendar-cell ${isToday(day) ? 'today' : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        <span style={{ fontSize: '14px' }}>{day}</span>
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