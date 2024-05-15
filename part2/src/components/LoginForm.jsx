import { useState } from "react"
import login from "../services/login"
import noteService from '../services/notes'

const LoginForm = ({ onSuccess, onError }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const loginResult = await login({ username, password })
            const { token } = loginResult

            onSuccess(loginResult)
            noteService.setToken(token)

            window.localStorage.setItem("loggedNoteappUser", JSON.stringify(loginResult))
            setUsername("")
            setPassword("")
        } catch (error) {
            onError(error.message)

            setTimeout(() => {
                onError("")
            }, 5000)
        }
    }

    return (<>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>

            <button type="submit">Log in</button>
        </form>
    </>)
}

export default LoginForm