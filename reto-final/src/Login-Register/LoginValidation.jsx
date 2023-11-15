function Validation (values){
    let error = {}
    const correo_pattern = /^[^\s@]+@[^\s@]+$/
    const contraseña_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/


    if(values.email === ""){
        error.email = "El nombre no debe ser empático."
    }
    else if(!correo_pattern.test(values.email)){
        error.email = "El correo electrónico no coincide"
    }
    else {
        error.email = ""
    }

    if(values.password === ""){
        error.password = "La contraseña no debe ser empático."
    }
    else if(!contraseña_pattern.test(values.password)){
        error.password = "La contraseña no coincide"
    }
    else {
        error.password = ""
    }

    return error;
}

export default Validation;