import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import Modal from "react-modal"
import app from "../config/config/firebase.config";

const CardUser:FC<{ user: any, disabled: boolean, get: any }> = ({ user, disabled, get }) => {

    const [openModal, setOpenModal] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)

    const [nombre, setNombre] = useState(user.nombre)
    const [email, setEmail] = useState(user.email)
    const [usuario, setUsuario] = useState(user.usuario)
    const [password, setPassword] = useState(user.password)

    const deleteUsuario = async () => {

        const db = getFirestore(app);

        await deleteDoc(doc(db, 'usuarios', user.id));

        get()

    }

    const updateUsuario = async () => {
        const db = getFirestore(app);

        await updateDoc(doc(db, 'usuarios', user.id), {
            nombre,
            email,
            usuario,
            password,
            date: new Date()
        });

        setOpenModal(false)
        get()
    }

    return (
        <>
            <div className="card_user">
                <p>{user.email}</p>
                {
                    !disabled ? (
                        <div className="accions">
                            <i onClick={() => setOpenModal(true)} className="fas fa-edit"></i>
                            <i onClick={() => deleteUsuario()} className="fas fa-trash"></i>
                            <i onClick={() => setOpenModalDetail(true)} className="fas fa-eye"></i>
                        </div>
                    ) : null
                }
            </div>   
            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                className="modal"
            >
                <form className="add_user">
                    <h1>Actualizar usuario</h1>
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
                    <button onClick={() => updateUsuario()} className="btn">Actualizar</button>
                    <button onClick={() => setOpenModal(false)} className="btn">Cancelar</button>
                </form>
            </Modal>
            <Modal
                isOpen={openModalDetail}
                onRequestClose={() => setOpenModalDetail(false)}
                className="modal"
            >
                <form className="add_user">
                    <h1>Usuario</h1>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input disabled value={user.nombre} type="text" placeholder="Nombre completo" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-envelope"></i>
                        <input disabled value={user.email} type="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input disabled value={user.usuario} type="text" placeholder="Usuario" />
                    </div>
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <input disabled value={user.password} placeholder="Contraseña" />
                    </div>
                    <button onClick={() => setOpenModal(false)} className="btn">Cerrar</button>
                </form>
            </Modal>     
        </>
    );

};

export default CardUser;