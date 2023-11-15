import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function AgregarCla(){
    const [values, setValues] = useState({
        nombre: "",
        prerrequisito: "",
        creditos: 0,
        cupos: 0,
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/clase', values)
        .then(res => {
            console.log(res);
            navigate('/clase')
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Agregar Curso</h2>
                    <div className="mb-2">
                        <label htmlFor="">Nombre</label>
                        <input type="text" placeholder="Agregar Nombre" className="form-control" 
                        onChange={e => setValues({...values, nombre: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Curso Prerrequisito</label>
                        <input type="text" placeholder="Agregar curso prerrequisito" className="form-control" 
                        onChange={e => setValues({...values, prerrequisito: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Numeros Creditos</label>
                        <input type="number" placeholder="Agregar numeros creditos" className="form-control" 
                        onChange={e => setValues({...values, creditos: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Cupos disponibles</label>
                        <input type="number" placeholder="Agregar cupos disponibles" className="form-control" 
                        onChange={e => setValues({...values, cupos: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
                    <button className="btn btn-success">Agregar</button>
                </form>
            </div>
        </div>
    )
}

export default AgregarCla