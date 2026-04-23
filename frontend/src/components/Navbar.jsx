import supabase from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../App'

function Navbar() {
    const navigate = useNavigate()
    const { darkMode, setDarkMode } = useContext(ThemeContext)

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '60px',
            borderBottom: '1px solid #f0f0f0',
            backgroundColor: darkMode ? '#1a1f2e' : '#ffffff'
        }}>
            <span style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#378ADD'
            }}>
                Taskly
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        backgroundColor: darkMode ? '#252b3d' : 'white',
                        fontSize: '14px',
                        color: darkMode ? '#e0e0e0' : '#666'
                    }}
                >
                    {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        navigate('/login')
                    }}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        backgroundColor: darkMode ? '#252b3d' : 'white',
                        fontSize: '14px',
                        color: darkMode ? '#e0e0e0' : '#666'
                    }}
                >
                    Sign out
                </button>
            </div>
        </nav>
    )
}

export default Navbar