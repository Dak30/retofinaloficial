import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login-Register/Login"
import Register from "./Login-Register/Register"
import Home from './Home'
import Profesor from "./Profesor/Profesores"
import Clase from "./Clase/Clases"
import AgregarPro from "./Profesor/AgregarPro"
import ActualizarPro from "./Profesor/ActualizarPro"
import AgregarCla from "./Clase/AgregarCla"
import ActualizarCla from "./Clase/ActualizarCla"
import Estudiantes from "./Estudiante/Estudiantes"
import ActualizarEst from "./Estudiante/ActualizarEst"
import AgregarEst from "./Estudiante/AgregarEst"

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Login/>}/>
                <Route path="/register" element={< Register/>}/>
                <Route path='/home' element={<Home />} />
                <Route path='/profesor' element={<Profesor />} />
                <Route path='/agregarpro' element={<AgregarPro />} />
                <Route path='/editarpro/:id' element={<ActualizarPro />} />
                <Route path='/clase' element={<Clase />} />     
                <Route path='/agregarcla' element={<AgregarCla />} />  
                <Route path='/editarcla/:id' element={<ActualizarCla />} />  
                <Route path='/estudiante' element={<Estudiantes />} />     
                <Route path='/agregarest' element={<AgregarEst />} />  
                <Route path='/editarest/:id' element={<ActualizarEst />} />  
            </Routes>
        </BrowserRouter>
    )
}

export default App