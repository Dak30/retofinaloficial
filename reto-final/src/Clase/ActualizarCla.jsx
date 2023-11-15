import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ActualizarCla() {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/leercla/' + id)
            .then(res => {
                console.log(res)
                setValues({...values, nombre: res.data[0].Nombre, prerrequisito: res.data[0].Prerrequisito,
                    creditos: res.data[0].Creditos, cupos: res.data[0].Cupos})
            }).catch((err) => console.log(err));
    }, []);

    const [values, setValues] = useState({
        nombre: '',
        prerrequisito: '',
        creditos: 0,
        cupos: 0,
    })

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/actualizarcla/' + id, values)
            .then(res => {
                console.log(res)
                navigate('/clase')
            }).catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Actualizar Curso</h2>
                    <div className="mb-2">
                        <label htmlFor="">Nombre</label>
                        <input
                            type="text"
                            placeholder="Enter Nombre"
                            className="form-control"
                            value={values.nombre}
                            onChange={e => setValues({...values, nombre: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Curso Prerrequisito</label>
                        <input
                            type="text"
                            placeholder="Enter Curso Prerrequisito"
                            className="form-control"
                            value={values.prerrequisito}
                            onChange={e => setValues({ ...values, prerrequisito: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Numero de Creditos</label>
                        <input
                            type="number"
                            placeholder="Enter Creditos"
                            className="form-control"
                            value={values.creditos}
                            onChange={e => setValues({ ...values, creditos: parseInt(e.target.value, 10) || 0 })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cupos Disponibles</label>
                        <input
                            type="number"
                            placeholder="Enter Cupos Disponibles"
                            className="form-control"
                            value={values.cupos}
                            onChange={e => setValues({ ...values, cupos: parseInt(e.target.value, 10) || 0 })}
                        />
                    </div>
                    <button className="btn btn-success">Actualizar</button>
                </form>
            </div>
        </div>
    )
}

export default ActualizarCla;
