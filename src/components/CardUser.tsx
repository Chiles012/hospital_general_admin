import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { FC, useState } from "react";
import Modal from "react-modal"
import app from "../config/config/firebase.config";
import emailjs from '@emailjs/browser';

const CardUser:FC<{ user: any, disabled?: boolean, get?: any, especialidad?: string, updateSpecialtyUser?: any }> = ({ user, disabled, get, especialidad, updateSpecialtyUser }) => {

    const [openModal, setOpenModal] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)

    const [nombre, setNombre] = useState(user!.nombre)
    const [email, setEmail] = useState(user!.email)
    const [usuario, setUsuario] = useState(user!.usuario)
    const [password, setPassword] = useState(user!.password)

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
                <p
                    onClick={() => {
                        const docs = []
                        if(disabled) {
                            for(let key in user.docs) {
                                if (user.docs[key] !== '') {
                                    docs.push(user.docs[key])
                                }
                            }
                            docs.forEach((doc) => {
                                if (doc !== '' && doc !== undefined && doc !== null && doc) {
                                    console.log(doc)
                                    let link     = document.createElement('a');
                                    link.href    = doc;
                                    link.target  = '_blank';
                                    link.click();
                                }
                            })
                        }
                    }}
                >{user.email || user.user}</p>
                {
                    !disabled ? (
                        <div className="accions">
                            <i onClick={(e) => {e.preventDefault(); setOpenModal(true)}} className="fas fa-edit"></i>
                            <i onClick={(e) => {e.preventDefault(); deleteUsuario()}} className="fas fa-trash"></i>
                            <i onClick={(e) => {e.preventDefault(); setOpenModalDetail(true)}} className="fas fa-eye"></i>
                        </div>
                    ) : null
                }
                {
                    disabled ? (
                        <div className="accions">
                            <button onClick={(e) => {
                                e.preventDefault(); 

                                // enviar correo de aceptación
                                emailjs.send('service_5jr8its', 'template_jfkqn2j', {
                                    especialidad: especialidad,
                                    email: user.user
                                }, 'wp7BlILE1VjsWYsFE').then(async (result) => {
                                    console.log(result.text);
                                    alert('Aceptado correctamente')
                                }).catch((error) => {
                                    console.log(error.text);
                                    alert('Error al enviar el correo')
                                });

                                get()

                                // eliminar usuario de la lista de espera
                                updateSpecialtyUser(user.user)

                            }} className="btn">Aceptar</button>
                        </div>
                    ) : null
                }
            </div>   
            {
                !disabled ? (
                    <>
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
                                <button onClick={(e) => {e.preventDefault(); updateUsuario()}} className="btn">Actualizar</button>
                                <button onClick={(e) => {e.preventDefault(); setOpenModal(false)}} className="btn">Cancelar</button>
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
                                <button onClick={(e) => {
                                    e.preventDefault(); 
                                    setOpenModalDetail(false)
                                }} className="btn">Cerrar</button>
                            </form>
                        </Modal>  
                    </>
                ) : null
            }
            
        </>
    );

};

export default CardUser;