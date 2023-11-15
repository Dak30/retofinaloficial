import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ActualizarEst() {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/leerest/'+id)
        .then(res=> {
            console.log(res)
            setValues({...values, nombre: res.data[0].Nombre, apellido: res.data[0].Apellido,
            facultad: res.data[0].Facultad, creditos: res.data[0].Creditos, semestre: res.data[0].Semestre})
        }).catch((err) => console.log(err));
    }, []);
        

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        facultad: '',
        creditos: 0,
        semestre: 0
    })

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/actualizarest/'+ id, values)
        .then(res=> {
            console.log(res)
            navigate('/estudiante')
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <h2>Actualizar Estudiante</h2>
            <div className="mb-2">
                        <label htmlFor="">Nombre</label>
                        <input type="text" placeholder="Enter Nombre" className="form-control" value={values.nombre}
                        onChange={e => setValues({...values, nombre: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Apellido</label>
                        <input type="text" placeholder="Enter Apellido" className="form-control" value={values.apellido}
                        onChange={e => setValues({...values, apellido: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Facultad</label>
                        <select className="form-control" value={values.facultad} onChange={e => setValues({...values, facultad: e.target.value})}>
                            <option value="">Seleccionar Facultad</option>
                            <option value="Ciencias de la salud">Ciencias de la salud</option>
                            <option value="Derecho, Ciencias Politicas y Sociales">Derecho, Ciencias Politicas y Sociales </option>
                            <option value="Ciencias Economicas, Administracion y Contables">Ciencias Economicas, Administracion y Contables</option>
                            <option value="Ingenieria">Ingenieria</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Creditos Inscritos</label>
                        <input type="number" placeholder="Enter Creditos" className="form-control" value={values.creditos}
                        onChange={e => setValues({...values, creditos: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Semestre</label>
                        <input type="number" placeholder="Enter Semestre" className="form-control" value={values.semestre}
                        onChange={e => setValues({...values, semestre: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
            <button className="btn btn-success">Actualizar</button>
        </form>
    </div>
</div>
  )
}

export default ActualizarEst
