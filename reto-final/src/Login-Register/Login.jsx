import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';


function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [acuerdo, setAcuerdo] = useState(false);
    const navigate = useNavigate();
    const [errores, setErrores] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrores(Validation(values));
      
        if (acuerdo && errores.email === "" && errores.password === "") {
          axios.post('http://localhost:8000/login', values)
            .then(res => {
              if (res.data === "Exito") {
                navigate('/home');
              } else {
                alert("No existía ningún registro");
              }
            })
            .catch(err => console.log(err));
        } else {
        //   alert("Estas de acuerdo con las políticas antes de continuar.");
        }
      };
      

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-25 '>
      <h2 className='text-center mb-4'>Inicia sesión</h2>
      <form action='' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='correo'><strong>Correo electrónico</strong></label>
          <input type='email' placeholder='Entrar Correo' name='email'
            onChange={handleInput} className='form-control rounded-0' />
          {errores.email && <span className='text-danger'>{errores.email}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor='contraseña'><strong>Contraseña</strong></label>
          <input type='password' placeholder='Entrar Contraseña' name='password'
            onChange={handleInput} className='form-control rounded-0' />
          {errores.password && <span className='text-danger'>{errores.password}</span>}
        </div>
        <div className='form-check mb-4'>
        <input
            type='checkbox'
            className='form-check-input'
            id='acuerdoPoliticas'
            checked={acuerdo}
            onChange={(event) => setAcuerdo(event.target.checked)}
        />
        <label className='form-check-label' htmlFor='acuerdoPoliticas'>Estás de acuerdo con nuestros términos y políticas.</label>
        </div>
        <button type='submit' className='btn btn-success w-100 '> <strong>Inicia sesión</strong></button>
        <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Crear una cuenta</Link>
      </form>
    </div>
  </div>
  
  )
}

export default Login
