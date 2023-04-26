import { FC, useState } from "react";
import Modal from "react-modal"
import CardUser from "./CardUser";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from "../config/config/firebase.config";

const Card:FC<{ especialidad: any, onDelete: any, get: any }> = ({ especialidad, onDelete, get }) => {

    const [nombre, setNombre] = useState(especialidad.nombre)
    const [descripcion, setDescripcion] = useState(especialidad.descripcion)
    const [openModal, setOpenModal] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)

    const updateEspecialidad = async () => {
        const db = getFirestore(app);

        await updateDoc(doc(db, 'especialidades', especialidad.id), {
            nombre,
            descripcion
        });

        setOpenModal(false)
        get()
    }

    return (
        <div className="card">
            <h2>
                {especialidad.nombre}
            </h2>
            <p>
                {especialidad.descripcion}
            </p>
            <div className="accions">
                <i onClick={() => setOpenModal(true)} className="fas fa-edit"></i>
                <i onClick={() => onDelete(especialidad.id)} className="fas fa-trash"></i>
                <i onClick={() => setOpenModalDetail(true)} className="fas fa-users"></i>
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                className="modal"
            >
                <form className="add_user">
                    <h1>Actualizar Especialidad</h1>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre" />
                    </div>
                    <div className="input-icon">
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripcion" />
                    </div>
                    <button onClick={(e) => {e.preventDefault(); updateEspecialidad()}} className="btn">Actualizar</button>
                    <button onClick={() => setOpenModal(false)} className="btn">Cancelar</button>
                </form>
            </Modal>
            <Modal
                isOpen={openModalDetail}
                onRequestClose={() => setOpenModalDetail(false)}
                className="modal"
            >
                <form className="add_user">
                    {

                        especialidad.usuarios.length > 0 ?
                        especialidad.usuarios.map((usuario: any) => (
                            <CardUser
                                disabled
                                key={usuario.id}
                                user={usuario}
                            />
                        )) :
                        <h1
                            style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: '#5b70f4'
                            }}
                        >No hay usuarios</h1>
                    }
                    <div className="btn" onClick={() => setOpenModalDetail(false)}>Cerrar</div>
                </form>
            </Modal>
        </div>
    );
}

export default Card;