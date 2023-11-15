import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import './Home.css'

function Home(){

    return(
        <div className='d-flex vh-100 bg-verde justify-content-center align-items-center'>
            <div className='w-90 bg-white rounded p-3'>
                <h2 className='text-center mb-4'>LISTAS:</h2>
                <div className='d-flex justify-content-end'>
                <Link to="/clase" className="btn btn-info mb-2 mr-3">Lista de Cursos</Link>
                <Link to="/estudiante" className="btn btn-info mb-2 mr-3">Lista de Estudiantes</Link>
                <Link to="/profesor" className="btn btn-info mb-2 mr-3">Lista de Profesores</Link>
                <Link to="/" className='btn btn-primary mb-2 mr-3'>Salir</Link>
                </div>
            </div>
        </div>        
    )
}

export default Home