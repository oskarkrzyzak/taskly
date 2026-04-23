import { useState } from 'react'
import DayPanel from './DayPanel'

function Calendar({ tasks, onUpdate }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showDayPanel, setShowDayPanel] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)

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
                        onClick={() => {
                            setSelectedDay(day)
                            setShowDayPanel(true)
                        }}
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
            {showDayPanel && selectedDay && (
                <DayPanel
                    day={selectedDay}
                    month={month}
                    year={year}
                    tasks={tasks}
                    onClose={() => setShowDayPanel(false)}
                    onUpdate={() => {
                        onUpdate()
                    }}
                />
            )}
        </div>
    )
}

export default Calendar