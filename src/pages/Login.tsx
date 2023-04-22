import '../sass/pages/login.page.scss'

const Login = () => {
    return (
        <div className="login container">
            <div className="login-content">
                <h1>¡BIENVENIDO!</h1>
                <br />
                <form>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Usuario" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Contraseña" />
                    </div>
                    <button className="btn">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}

export default Login