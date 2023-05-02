import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import '../sass/pages/login.page.scss'
import app from '../config/config/firebase.config'
import { useDispatch } from 'react-redux'

const Login = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const login = async () => {

        const auth = getAuth(app);

        try {
            
            const user = await signInWithEmailAndPassword(auth, name, password)

            dispatch({
                type: 'SET_USER',
                payload: user.user.email
            })

        } catch (error: any) {
            alert(error.message || 'Credenciales Incorrectas')
        }

    }

    return (
        <div className="login container">
            <div className="login-content">
                <h1>¡BIENVENIDO!</h1>
                <br />
                <form>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Usuario" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        login()
                    }} className="btn">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}

export default Login