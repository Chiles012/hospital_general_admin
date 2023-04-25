import { useEffect, useState } from 'react';
import { Card } from '../components'
import Modal from 'react-modal'
import { getFirestore, getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import app from '../config/config/firebase.config'

import '../sass/pages/home.page.scss'

const Home = () => {

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [especialidades, setEspecialidades] = useState<any[]>([])

    const getSpecialidades = async () => {

        const db = getFirestore(app);
        const docs = await getDocs(collection(db, 'especialidades'));

        const especialidades = docs.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setEspecialidades(especialidades)

    }

    const deleteEspecialidad = async (id: string) => {

        const db = getFirestore(app);

        console.log(id)

        await deleteDoc(doc(db, 'especialidades', id));
        
        getSpecialidades()

    }

    const createEspecialidad = async () => {

        const db = getFirestore(app);

        await addDoc(collection(db, 'especialidades'), {
            nombre,
            descripcion,
            date: new Date(),
            usuarios: [],
            vuelta: 0
        });

        setOpenModal(false)
        getSpecialidades()

        setDescripcion('')
        setNombre('')

    }

    useEffect(() => {
        getSpecialidades()
    }, [])

    return (
        <div className="content-page">
            <div className="header_page">
                <h1>Especialidades</h1>
                <i onClick={() => setOpenModal(true)} className="fas fa-plus"></i>
            </div>
            <div className="content_page_especialidades">
                {
                    especialidades.length > 0 ?
                    especialidades.map(especialidad => (
                        <Card
                            key={especialidad.id}
                            especialidad={especialidad}
                            onDelete={deleteEspecialidad}
                            get={getSpecialidades}
                        />
                    ))
                    :
                    <h1
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            color: '#5b70f4'
                        }}
                    >No hay especialidades</h1>
                }
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={() => setOpenModal(false)}
                className="modal"
            >
                <form className="add_user">
                    <h1>Registrar Especialidad</h1>
                    <div className="input-icon">
                        <i className="fas fa-user"></i>
                        <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre" />
                    </div>
                    <div className="input-icon">
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripcion" />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        createEspecialidad()
                    }} className="btn">Crear</button>
                    <button onClick={() => setOpenModal(false)} className="btn">Cancelar</button>
                </form>
            </Modal>
        </div>
    );
};

export default Home;