import supabase from '../supabaseClient'

function Login() {
    async function loginWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
    }

    return (
        <div>
            <h1>Witaj w Taskly</h1>
            <p>Zaloguj się przez Google</p>
            <button onClick={loginWithGoogle}>Zaloguj się przez Google</button>
        </div>
    )
}

export default Login