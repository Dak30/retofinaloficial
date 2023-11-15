import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ActualizarPro() {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/leerpro/'+id)
        .then(res=> {
            console.log(res)
            setValues({...values, nombre: res.data[0].Nombre, apellido: res.data[0].Apellido,
            tituloa: res.data[0].TituloA, añosexpe: res.data[0].Añosexpe, nombrecurso: res.data[0].Nombrecurso})
        })
        .catch((err) => console.log(err));
    }, []);
        

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        tituloa: '',
        añosexpe: 0,
        nombrecurso: ''
    })

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/actualizarpro/'+ id, values)
        .then(res=> {
            console.log(res)
            navigate('/profesor')
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <h2>Actualizar Profesor</h2>
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
                        <label htmlFor="">Titulo Academico</label>
                        <input type="text" placeholder="Enter Titulo Academico" className="form-control" value={values.tituloa}
                        onChange={e => setValues({...values, tituloa: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Años de experiencia</label>
                        <input type="number" placeholder="Enter Creditos" className="form-control" value={values.añosexpe}
                        onChange={e => setValues({...values, añosexpe: parseInt(e.target.value, 10 || 0)})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Nombre de curso</label>
                        <input type="text" placeholder="Enter Nombre de curso" className="form-control" value={values.nombrecurso}
                        onChange={e => setValues({...values, nombrecurso: e.target.value})}/>
                    </div>
            <button className="btn btn-success">Actualizar</button>

        </form>
    </div>
</div>
  )
}

export default ActualizarPro
