import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function AgregarPro(){
    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        tituloa: "",
        añosexpe: 0,
        nombrecurso: "",
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/profesor', values)
        .then(res => {
            console.log(res);
            navigate('/profesor')
        })
        .catch(err => console.log(err));
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Agregar Profesor</h2>
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
                        <label htmlFor="">Titulo Academico</label>
                        <input type="text" placeholder="Agregar Titulo Academico" className="form-control" 
                        onChange={e => setValues({...values, tituloa: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Años de Experiencia</label>
                        <input type="number" placeholder="Agregar Años de Expereincia" className="form-control" 
                        onChange={e => setValues({...values, añosexpe: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Nombre de curso que dictas</label>
                        <input type="text" placeholder="Agregar Nombre de Curso" className="form-control" 
                        onChange={e => setValues({...values, nombrecurso: e.target.value})}/>
                    </div>
                    <button className="btn btn-success">Agregar</button>
                </form>
            </div>
        </div>
        
        
    )
}

export default AgregarPro