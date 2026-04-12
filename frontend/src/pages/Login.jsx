import supabase from '../supabaseClient'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    async function loginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/dashboard'
            }
        })
    }
    
    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate('/dashboard')
            }
        })
    }, [])

    return (
        <div>
            <h1>Witaj w Taskly</h1>
            <p>Zaloguj się przez Google</p>
            <button onClick={loginWithGoogle}>Zaloguj się przez Google</button>
        </div>
    )
}

export default Login