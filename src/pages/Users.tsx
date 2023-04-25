import { useEffect, useState } from "react"
import CardUser from "../components/CardUser"
import '../sass/pages/user.page.scss'
import Modal from "react-modal"
import app from "../config/config/firebase.config"
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore"

const Users = () => {

    const [openModal, setOpenModal] = useState(false)
    const [usuarios, setUsuarios] = useState<any[]>([])
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')

    const getUsuarios = async () => {

        const db = getFirestore(app);

        const docs = await getDocs(collection(db, 'usuarios'));

        const usuarios = docs.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setUsuarios(usuarios)

    }

    const createUsuario = async () => {

        const db = getFirestore(app);

        await addDoc(collection(db, 'usuarios'), {
            nombre,
            email,
            usuario,
            password,
            date: new Date()
        });

        setOpenModal(false)
        getUsuarios()

        setNombre('')
        setEmail('')
        setUsuario('')
        setPassword('')
    }

    useEffect(() => {
        getUsuarios()
    }, [])

    return (
        <div className="content-page">
            <div className="header_page">
                <h1>Usuarios</h1>
                <i onClick={() => setOpenModal(true)} className="fas fa-plus"></i>
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                className="modal"
            >
                <form className="add_user">
                    <h1>Registrar usuario</h1>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre completo" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-envelope"></i>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input value={usuario} onChange={(e) => setUsuario(e.target.value)} type="text" placeholder="Usuario" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
                    </div>
                    <button onClick={() => createUsuario()} className="btn">Registrarse</button>
                    <button onClick={() => setOpenModal(false)} className="btn">Cancelar</button>
                </form>
            </Modal>
            <div className="content_page_usuarios">
                {
                    usuarios.length > 0 ? 
                    usuarios.map((usuario, index) => (
                        <CardUser
                            key={index}
                            user={usuario}
                            get={getUsuarios}
                        />
                    )) : 
                    <h1
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            color: '#5b70f4'
                        }}
                    >
                        No hay usuarios registrados
                    </h1>
                }
            </div>
        </div>
    )

}

export default Users