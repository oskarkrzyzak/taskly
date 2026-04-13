import { useState } from 'react'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    
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
    
    return (
        <div>
            <h2>{currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={prevMonth}>{"<"}</button>
            <button onClick={nextMonth}>{">"}</button>
        </div>
    ) 
}

export default Calendar