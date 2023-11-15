import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function AgregarEst(){
    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        facultad: "",
        creditos: "",
        semestre: "",
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/estudiante', values)
        .then(res => {
            console.log(res);
            navigate('/estudiante')
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Agregar Estudiante</h2>
                    <div className="mb-2">
                        <label htmlFor="">Nombre</label>
                        <input type="text" placeholder="Agregar Nombre" className="form-control" 
                        onChange={e => setValues({...values, nombre: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Apellido</label>
                        <input type="text" placeholder="Agregar Apellido" className="form-control" 
                        onChange={e => setValues({...values, apellido: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Facultad</label>
                        <select className="form-control" onChange={e => setValues({...values, facultad: e.target.value})}>
                            <option value="" desabled>Seleccionar Facultad que cursa</option>
                            <option value="Ciencias de la salud">Ciencias de la salud</option>
                            <option value="Derecho, Ciencias Politicas y Sociales">Derecho, Ciencias Politicas y Sociales </option>
                            <option value="Ciencias Economicas, Administracion y Contables">Ciencias Economicas, Administracion y Contables</option>
                            <option value="Ingenieria">Ingenieria</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Creditos Inscritos</label>
                        <input type="number" placeholder="Agregar Creditos" className="form-control" 
                        onChange={e => setValues({...values, creditos: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Semestre</label>
                        <input type="number" placeholder="Agregar Semestre" className="form-control" 
                        onChange={e => setValues({...values, semestre: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
                    <button className="btn btn-success">Agregar</button>
                </form>
            </div>
        </div>
        
        
    )
}

export default AgregarEst