import supabase from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    return (
        <nav>
            <h1>Taskly</h1> 
            <button onClick={async () => {
                await supabase.auth.signOut()
                navigate('/login')
            }}>Wyloguj</button>
        </nav>
    )
}

export default Navbar