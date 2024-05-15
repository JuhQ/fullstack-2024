
const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {

    return (<>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={({ target }) => handleUsernameChange(target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={({ target }) => handlePasswordChange(target.value)}
                />
            </div>

            <button type="submit">Log in</button>
        </form>
    </>)
}

export default LoginForm