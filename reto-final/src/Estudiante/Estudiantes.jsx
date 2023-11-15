import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function Estudiantes(){

    const [data, setEstudiantes] = useState([]) 
    const [searchValue, setSearchValue] = useState('');
    const [selectedFacultad, setSelectedFacultad] = useState('');
    const facultades = ["Ciencias de la salud", "Derecho, Ciencias Politicas y Sociales", 
    "Ciencias Economicas, Administracion y Contables", "Ingenieria"];


    useEffect(() => {
        axios.get('http://localhost:8000/estudiante')
        .then(res => setEstudiantes(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/eliminarest/'+id)
        .then(res => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

    const filteredEstudiantes = data.filter((estudiante) => {
    const nombreMatches = estudiante.Nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        estudiante.Apellido.toLowerCase().includes(searchValue.toLowerCase());
    const facultadMatches = selectedFacultad === '' || estudiante.Facultad === selectedFacultad;
        return nombreMatches && facultadMatches;
    });
    

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-90 bg-white rounded p-3'>
                <h2>Lista de Estudiantes</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/agregarest" className="btn btn-success mb-2 mr-2">Agregar +</Link>
                    <Link to="/home" className='btn btn-primary mb-2 mr-2'>Atras</Link>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o apellido"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="form-control me-2"/>
                    <select
                        className="form-select"
                        value={selectedFacultad}
                        onChange={(e) => setSelectedFacultad(e.target.value)}>
                        <option value="">Todas las Facultades</option>
                        {facultades.map((facultad, index) => (
                            <option key={index} value={facultad}>
                                {facultad}
                            </option>
                        ))}
                    </select>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Facultad</th>
                            <th>Creditos Inscritos</th>
                            <th>Semestre</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEstudiantes.map((estudiante, index) =>{
                            return <tr key={index}>
                                <td>{estudiante.ID}</td>
                                <td>{estudiante.Nombre}</td>
                                <td>{estudiante.Apellido}</td>
                                <td>{estudiante.Facultad}</td>
                                <td>{estudiante.Creditos}</td>
                                <td>{estudiante.Semestre}</td>
                                <td>
                                    <Link to={`/editarest/${estudiante.ID}`} className="btn btn-sm btn-primary mx-2">Editar</Link>
                                    <button onClick={() => handleDelete(estudiante.ID)} className='btn btn-sm btn-danger'>Eliminar</button>
                                </td>
                            </tr>
                        })} 
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Estudiantes