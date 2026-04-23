function Sidebar({ tasks }) {
    const today = new Date().toISOString().split('T')[0]
    const upcoming = tasks
        .filter(task => task.date >= today && !task.status)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5)

    return (
        <div className="sidebar">
            <h2>Upcoming tasks</h2>
            {upcoming.length === 0 ? (
                <p>No tasks</p>
            ) : (
                upcoming.map(task => (
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