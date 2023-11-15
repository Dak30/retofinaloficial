import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

function Clases() {
  const [data, setClases] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/clase')
      .then(res => {
        // Agregar la propiedad "CuposDisponibles" a cada clase
        const clasesWithAvailability = res.data.map(clase => ({
          ...clase,
          CuposDisponibles: clase.Cupos > 0, // Si hay cupos, es true; de lo contrario, es false
        }));
        setClases(clasesWithAvailability);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/eliminarcla/${id}`)
      .then(res => {
        location.reload();
      })
      .catch(err => console.log(err));
  }

  const filteredClases = data.filter((clase) =>
    clase.Nombre.toLowerCase().includes(searchValue.toLowerCase()) &&
    (clase.CuposDisponibles === true)
  );

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-90 bg-white rounded p-3'>
        <h2>Lista de Cursos</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/agregarcla" className="btn btn-success mb-2 mr-2">Agregar +</Link>
          <Link to="/home" className='btn btn-primary mb-2 mr-2'>Atras</Link>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="form-control w-50"
          />
        </div>
        <Scrollbars
          autoHeight
          autoHeightMin={200}
          autoHeightMax={600}
        >
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Prerrequisito</th>
                <th>Credito(s)</th>
                <th>Cupo(s)</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {filteredClases.map((clase, index) => {
                return <tr key={index}>
                  <td>{clase.ID}</td>
                  <td>{clase.Nombre}</td>
                  <td>{clase.Prerrequisito}</td>
                  <td>{clase.Creditos}</td>
                  <td>{clase.Cupos}</td>
                  <td>
                    <Link to={`/editarcla/${clase.ID}`} className="btn btn-sm btn-primary mx-2">Editar</Link>
                    <button onClick={() => handleDelete(clase.ID)} className='btn btn-sm btn-danger'>Eliminar</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </Scrollbars>
      </div>
    </div>
  );
}

export default Clases;
