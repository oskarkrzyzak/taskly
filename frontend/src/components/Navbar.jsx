import supabase from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '60px',
            borderBottom: '1px solid #f0f0f0',
            backgroundColor: '#ffffff'
        }}>
            <span style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#378ADD'
            }}>
                Taskly
            </span>
            <button
                onClick={async () => {
                    await supabase.auth.signOut()
                    navigate('/login')
                }}
                style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    color: '#666'
                }}
            >
                Sign out
            </button>
        </nav>
    )
}

export default Navbar