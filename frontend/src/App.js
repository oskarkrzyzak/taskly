import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './styles/global.css'


export const ThemeContext = React.createContext()

function App() {
    const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
    })

    
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <div className={darkMode ? 'dark' : 'light'}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    )
}

export default App