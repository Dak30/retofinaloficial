import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profesor() {
    
    const [data, setProfesores] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/profesor')
            .then((res) => setProfesores(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:8000/eliminarpro/' + id)
            .then((res) => {
                location.reload();
            })
            .catch((err) => console.log(err));
    };

    const filteredProfesores = data.filter((profesor) =>
        profesor.Nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        profesor.Apellido.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-90 bg-white rounded p-3">
                <h2>Lista de Profesores</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/agregarpro" className="btn btn-success mb-2 mr-2">
                        Agregar +
                    </Link>
                    <Link to="/home" className="btn btn-primary mb-2 mr-2">
                        Atrás
                    </Link>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o apellido"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="form-control w-50"
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre(s)</th>
                            <th>Apellido(s)</th>
                            <th>Título Académico</th>
                            <th>Años de Experiencia</th>
                            <th>Nombre de curso que dictan</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProfesores.map((profesor, index) => {
                            return (
                                <tr key={index}>
                                    <td>{profesor.ID}</td>
                                    <td>{profesor.Nombre}</td>
                                    <td>{profesor.Apellido}</td>
                                    <td>{profesor.TituloA}</td>
                                    <td>{profesor.Añosexpe}</td>
                                    <td>{profesor.Nombrecurso}</td>
                                    <td>
                                        
                                        <Link
                                            to={`/editarpro/${profesor.ID}`}
                                            className="btn btn-sm btn-primary mx-2"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(profesor.ID)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profesor;
