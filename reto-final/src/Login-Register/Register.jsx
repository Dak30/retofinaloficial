import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './RegisterValidation'
import axios from 'axios'


function Register() {

    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
    })

    const [acuerdoPoliticas, setAcuerdoPoliticas] = useState(false);

    const navigate = useNavigate();

    const [errores, setErrores] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrores(Validation(values));
        
        if (acuerdoPoliticas && errores.name === "" && errores.lastname === "" && errores.email === "" && errores.password === "") {
          axios.post('http://localhost:8000/register', values)
            .then(res => {
              navigate('/');
            })
            .catch(err => console.log(err));
        } else {
            // alert("Estas de acuerdo con las políticas antes de continuar.");
        }
      };
      

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2 className='mb-4  text-center'>Registrar</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='nombre'><strong>Nombre(s)</strong></label>
                    <input type='text' placeholder='Entrar Correo'  name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errores.name && <span className='text-danger'>{errores.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='apellido'><strong>Apellido(s)</strong></label>
                    <input type='text' placeholder='Entrar Correo'  name='lastname'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errores.lastname && <span className='text-danger'>{errores.lastname}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='correo'><strong>Correo electronico</strong></label>
                    <input type='email' placeholder='Entrar Correo' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errores.email && <span className='text-danger'>{errores.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='contraseña'><strong>Contraseña</strong></label>
                    <input type='password' placeholder='Entrar Contraseña' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errores.password && <span className='text-danger'>{errores.password}</span>}
                </div>
                <div className='form-check mb-4'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    id='acuerdoPoliticas'
                    checked={acuerdoPoliticas}
                    onChange={(event) => setAcuerdoPoliticas(event.target.checked)}
                    />
                    <label className='form-check-label' htmlFor='acuerdoPoliticas'>
                        Estás de acuerdo con nuestras políticas
                    </label>
                </div>
                <button type='submit' className='btn btn-success w-100 '> <strong>Registrar</strong></button>
                <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none' >Inicia sesion</Link>
            </form>
        </div>
    </div>
  )
}

export default Register
