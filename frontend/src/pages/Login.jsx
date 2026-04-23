import supabase from '../supabaseClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SPECIAL_CHARS = /[!@#$%^&*]/
const UPPERCASE = /[A-Z]/
const NUMBER = /[0-9]/

function getStrength(pwd) {
    const len = pwd.length
    const hasUpper = UPPERCASE.test(pwd)
    const hasSpecial = SPECIAL_CHARS.test(pwd)
    const hasNumber = NUMBER.test(pwd)
    if (len === 0) return null
    if (len < 8) return { level: 0, label: 'Weak', color: '#ef4444' }
    if (len >= 12 && hasUpper && hasSpecial && hasNumber) return { level: 4, label: 'Very strong', color: '#16a34a' }
    if (hasUpper && hasSpecial) return { level: 3, label: 'Strong', color: '#4ade80' }
    if (hasUpper || hasSpecial) return { level: 2, label: 'Good', color: '#eab308' }
    return { level: 1, label: 'Fair', color: '#f97316' }
}

function PasswordStrengthIndicator({ password, dark }) {
    const strength = getStrength(password)
    const hasUpper = UPPERCASE.test(password)
    const hasSpecial = SPECIAL_CHARS.test(password)
    const metColor = '#16a34a'
    const unmetColor = dark ? '#666' : '#aaa'

    const reqs = [
        { label: 'Minimum 8 characters', met: password.length >= 8 },
        { label: 'One uppercase letter', met: hasUpper },
        { label: 'One special character (!@#$%^&*)', met: hasSpecial },
    ]

    if (!password) return null

    return (
        <div style={{ marginTop: '8px', marginBottom: '6px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: strength && strength.level > i ? strength.color : (dark ? '#3a3f52' : '#e5e7eb'),
                        transition: 'background-color 0.2s'
                    }} />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: strength ? strength.color : unmetColor, fontWeight: '600' }}>
                    {strength ? strength.label : ''}
                </span>
            </div>
            {reqs.map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: r.met ? metColor : unmetColor, fontWeight: '700', width: '12px' }}>
                        {r.met ? '✓' : '·'}
                    </span>
                    <span style={{ fontSize: '12px', color: r.met ? metColor : unmetColor }}>
                        {r.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

function Login() {
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(false)
    const [view, setView] = useState('login') // 'login' | 'signup'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regConfirm, setRegConfirm] = useState('')
    const [regError, setRegError] = useState('')
    const [regSuccess, setRegSuccess] = useState('')
    const [regLoading, setRegLoading] = useState(false)

    useEffect(() => {
        setDarkMode(localStorage.getItem('darkMode') === 'true')
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) navigate('/dashboard')
        })
    }, [])

    function switchToSignup() {
        setRegEmail('')
        setRegPassword('')
        setRegConfirm('')
        setRegError('')
        setRegSuccess('')
        setView('signup')
    }

    function switchToLogin() {
        setError('')
        setView('login')
    }

    async function loginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: 'http://localhost:3000/dashboard' }
        })
    }

    async function handleSignIn() {
        setError('')
        if (!email || !password) {
            setError('Please enter your email and password.')
            return
        }
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        setLoading(false)
        if (error) {
            setError(error.message)
        } else if (data.session) {
            navigate('/dashboard')
        }
    }

    async function handleSignUp() {
        setRegError('')
        if (!regEmail || !regPassword || !regConfirm) {
            setRegError('Please fill in all fields.')
            return
        }
        const strength = getStrength(regPassword)
        if (!strength || strength.level < 2) {
            setRegError('Password is too weak. Reach at least "Good" strength.')
            return
        }
        if (regPassword !== regConfirm) {
            setRegError('Passwords do not match.')
            return
        }
        setRegLoading(true)
        const { error } = await supabase.auth.signUp({ email: regEmail.trim(), password: regPassword })
        setRegLoading(false)
        if (error) {
            setRegError(error.message)
        } else {
            setRegSuccess('Account created! Check your email to confirm, then sign in.')
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

    const primaryBtn = {
        width: '100%',
        padding: '11px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#378ADD',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '4px'
    }

    if (view === 'signup') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: colors.bg }}>
                <div style={{ textAlign: 'center', padding: '48px', borderRadius: '16px', border: `1px solid ${colors.border}`, backgroundColor: colors.card, width: '400px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#378ADD', marginBottom: '8px' }}>Taskly</h1>
                    <p style={{ color: colors.subtext, marginBottom: '28px', fontSize: '15px' }}>Create your account</p>

                    {regSuccess ? (
                        <>
                            <p style={{ color: '#4caf50', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>{regSuccess}</p>
                            <button type="button" onClick={switchToLogin} style={primaryBtn}>
                                Back to sign in
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                value={regEmail}
                                onChange={e => setRegEmail(e.target.value)}
                                style={inputStyle}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={regPassword}
                                onChange={e => setRegPassword(e.target.value)}
                                style={{ ...inputStyle, marginBottom: '0' }}
                            />
                            <PasswordStrengthIndicator password={regPassword} dark={darkMode} />
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={regConfirm}
                                onChange={e => setRegConfirm(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSignUp()}
                                style={{ ...inputStyle, marginBottom: '0' }}
                            />

                            {regError && (
                                <p style={{ color: '#e05555', fontSize: '13px', marginTop: '10px' }}>{regError}</p>
                            )}

                            <button
                                type="button"
                                onClick={handleSignUp}
                                disabled={regLoading}
                                style={{ ...primaryBtn, opacity: regLoading ? 0.7 : 1, cursor: regLoading ? 'not-allowed' : 'pointer', marginTop: '14px' }}
                            >
                                {regLoading ? 'Creating account...' : 'Create account'}
                            </button>

                            <button
                                type="button"
                                onClick={switchToLogin}
                                style={{ background: 'none', border: 'none', color: '#378ADD', fontSize: '13px', cursor: 'pointer', marginTop: '16px', textDecoration: 'underline' }}
                            >
                                Back to login
                            </button>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: colors.bg }}>
            <div style={{ textAlign: 'center', padding: '48px', borderRadius: '16px', border: `1px solid ${colors.border}`, backgroundColor: colors.card, width: '400px' }}>
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

                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    <button
                        type="button"
                        onClick={handleSignIn}
                        disabled={loading}
                        style={{ flex: 1, padding: '11px', borderRadius: '8px', border: 'none', backgroundColor: '#378ADD', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        Sign in
                    </button>
                    <button
                        type="button"
                        onClick={switchToSignup}
                        style={{ flex: 1, padding: '11px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'transparent', color: colors.text, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                    >
                        Sign up
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }} />
                    <span style={{ color: colors.subtext, fontSize: '13px' }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: colors.border }} />
                </div>

                <button
                    type="button"
                    onClick={loginWithGoogle}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${colors.border}`, backgroundColor: 'transparent', color: colors.text, fontSize: '15px', cursor: 'pointer' }}
                >
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
