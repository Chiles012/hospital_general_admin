import { FC, useState } from "react";
import Modal from "react-modal"
import CardUser from "./CardUser";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from "../config/config/firebase.config";

const Card:FC<{ especialidad: any, onDelete: any, get: any }> = ({ especialidad, onDelete, get }) => {

    const [nombre, setNombre] = useState(especialidad.nombre)
    const [descripcion, setDescripcion] = useState(especialidad.descripcion)
    const [active, setActive] = useState(especialidad.active)
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

    const updateActive = async (value) => {
        const db = getFirestore(app);
        console.log(Boolean(value))

        await updateDoc(doc(db, 'especialidades', especialidad.id), {
            active: Boolean(value)
        });

        get()
    }

    const updateVuelta = async (value) => {
        const db = getFirestore(app);

        await updateDoc(doc(db, 'especialidades', especialidad.id), {
            vuelta: value
        });

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
                <div>
                <input width='50px' type="checkbox" value={active} onChange={(e) => {setActive(e.target.checked); updateActive(e.target.checked); console.log(e.target.checked)}} />
                {
                    active ? <p>Activo</p> : <p>Inactivo</p>
                }
                </div>
                <select name="" id="" value={especialidad.vuelta} onChange={(e) => updateVuelta(e.target.value)}>
                    <option value="1">Vuelta 1</option>
                    <option value="2">Vuelta 2</option>
                    <option value="3">Vuelta 3</option>
                    <option value="4">Vuelta 4</option>
                    <option value="5">Vuelta 5</option>
                </select>
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
                    <button onClick={(e) => {e.preventDefault(); setOpenModal(false)}} className="btn">Cancelar</button>
                </form>
            </Modal>
            <Modal
                isOpen={openModalDetail}
                onRequestClose={() => setOpenModalDetail(false)}
                className="modal"
            >
                <form className="add_user">
                    {

                        especialidad.users.length > 0 ?
                        especialidad.users.map((usuario: any) => (
                            <CardUser
                                disabled
                                key={usuario.id}
                                user={usuario}
                                get={get}
                                updateSpecialtyUser={async (email) => {
                                    // eliminar usuario
                                    const db = getFirestore(app);

                                    const especialidadRef = doc(db, 'especialidades', especialidad.id);

                                    console.log(especialidad.users.filter((user: any) => user.email !== email))

                                    await updateDoc(especialidadRef, {
                                        users: especialidad.users.filter((user: any) => user.user !== email)
                                    });
                                }}
                                especialidad={especialidad.nombre}
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
                    <div className="btn" onClick={(e) => {e.preventDefault(); setOpenModalDetail(false)}}>Cerrar</div>
                </form>
            </Modal>
        </div>
    );
}

export default Card;