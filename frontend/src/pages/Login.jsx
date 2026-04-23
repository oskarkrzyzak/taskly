import supabase from '../supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setDarkMode(localStorage.getItem('darkMode') === 'true')
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) navigate('/dashboard')
        })
    }, [])

    async function loginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: 'http://localhost:3000/dashboard' }
        })
    }

    async function handleSignIn() {
        setError('')
        setSuccessMsg('')
        if (!email || !password) {
            setError('Please enter your email and password.')
            return
        }
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        setLoading(false)
        if (error) {
            setError(error.message)
        } else if (data.session) {
            navigate('/dashboard')
        }
    }

    async function handleSignUp() {
        setError('')
        setSuccessMsg('')
        if (!email || !password) {
            setError('Please enter your email and password.')
            return
        }
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({ email, password })
        setLoading(false)
        if (error) {
            setError(error.message)
        } else {
            setSuccessMsg('Account created! You can now sign in.')
        }
    }

    const colors = darkMode
        ? { bg: '#1a1f2e', card: '#252b3d', text: '#e0e0e0', border: '#2d3348', inputBg: '#1a1f2e', subtext: '#888' }
        : { bg: '#ffffff', card: '#ffffff', text: '#111', border: '#e0e0e0', inputBg: '#ffffff', subtext: '#888' }

    const inputStyle = {
        width: '100%',
        padding: '11px 12px',
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.inputBg,
        color: colors.text,
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
        marginBottom: '10px'
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: colors.bg
        }}>
            <div style={{
                textAlign: 'center',
                padding: '48px',
                borderRadius: '16px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.card,
                width: '400px'
            }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#378ADD', marginBottom: '8px' }}>Taskly</h1>
                <p style={{ color: colors.subtext, marginBottom: '28px', fontSize: '15px' }}>Manage your tasks with ease</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSignIn()}
                    style={{ ...inputStyle, marginBottom: '0' }}
                />

                {error && <p style={{ color: '#e05555', fontSize: '13px', marginTop: '10px' }}>{error}</p>}
                {successMsg && <p style={{ color: '#4caf50', fontSize: '13px', marginTop: '10px' }}>{successMsg}</p>}

                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    <button onClick={handleSignIn} disabled={loading} style={{
                        flex: 1, padding: '11px', borderRadius: '8px', border: 'none',
                        backgroundColor: '#378ADD', color: '#fff', fontSize: '14px',
                        fontWeight: '600', cursor: 'pointer'
                    }}>Sign in</button>
                    <button onClick={handleSignUp} disabled={loading} style={{
                        flex: 1, padding: '11px', borderRadius: '8px',
                        border: `1px solid ${colors.border}`, backgroundColor: 'transparent',
                        color: colors.text, fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                    }}>Sign up</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }} />
                    <span style={{ color: colors.subtext, fontSize: '13px' }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }} />
                </div>

                <button onClick={loginWithGoogle} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '10px', width: '100%', padding: '12px', borderRadius: '8px',
                    border: `1px solid ${colors.border}`, backgroundColor: 'transparent',
                    color: colors.text, fontSize: '15px', cursor: 'pointer'
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </div>
    )
}

export default Login