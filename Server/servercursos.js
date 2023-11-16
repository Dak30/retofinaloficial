import express  from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "curso"
})

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database as id ' + db.threadId);
});

// Middleware para manejar errores
function handleResponse(res, err, result) {
    if (err) {
        console.error('Database error: ' + err);
        res.status(500).json({ Message: 'Error inside server' });
    } else {
        res.json(result);
    }
}


//CURSOS

app.get('/clase', (req, res) => {
    const sql = "SELECT * FROM clase";
    db.query(sql, (err, result) => {
        handleResponse(res, err, result);
    });
});


app.post('/clase', (req, res) => {
    const sql = "INSERT INTO clase (`Nombre`, `Prerrequisito`, `Creditos`, `Cupos`) VALUES ?";
    const values = [
        [req.body.nombre, req.body.prerrequisito, req.body.creditos, req.body.cupos]
    ];
    db.query(sql, [values], (err, result) => {
        handleResponse(res, err, result);
    });
});

app.get('/leercla/:id', (req, res) => {
    const sql = "SELECT * FROM clase WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        handleResponse(res, err, result);  
    })
})

app.put('/actualizarcla/:id', (req, res) => {
    const sql = "UPDATE clase SET `Nombre` = ?, `Prerrequisito` = ?, `Creditos` = ?, `Cupos` = ? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [req.body.nombre, req.body.prerrequisito, req.body.creditos, req.body.cupos, id], (err, result) => {
        handleResponse(res, err, result); 
    })
})

app.delete('/eliminarcla/:id', (req, res) => {
    const sql = "DELETE FROM clase WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        handleResponse(res, err, result);    
    })
})

// ESTUDIANTES  
app.get('/estudiante', (req, res) => {
    const sql = "SELECT * FROM estudiante";
    db.query(sql, (err, result) => {
        handleResponse(res, err, result);  
    })
})

app.post('/estudiante', (req, res)=>{
    const sql = "INSERT INTO estudiante (`Nombre`, `Apellido`, `Facultad`, `Creditos`, `Semestre`) VALUES (?)";
    console.log(req.body)
    const vlaues = [
        req.body.nombre,
        req.body.apellido,
        req.body.facultad,
        req.body.creditos,
        req.body.semestre
    ]
    db.query(sql, [vlaues], (err, result) => {
        handleResponse(res, err, result);
    })
})

app.get('/leerest/:id', (req, res) => {
    const sql = "SELECT * FROM estudiante WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        handleResponse(res, err, result);   
    })
})

app.put('/actualizarest/:id', (req, res) => {
    const sql = "UPDATE estudiante SET `Nombre` = ?, `Apellido` = ?, `Facultad` = ?, `Creditos` = ?, `Semestre` = ? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [req.body.nombre, req.body.apellido, req.body.facultad, req.body.creditos, req.body.semestre, id], (err, result) => {
        handleResponse(res, err, result);  
    })
})

app.delete('/eliminarest/:id', (req, res) => {
    const sql = "DELETE FROM estudiante WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        handleResponse(res, err, result);    
    })
})

//PROFESOR

app.get('/profesor', (req, res) => {
    const sql = "SELECT * FROM profesor";
    db.query(sql, (err, result) => {
        handleResponse(res, err, result);   
    })
})


app.post('/profesor', (req, res)=>{
    const sql = "INSERT INTO profesor (`Nombre`, `Apellido`, `TituloA`, `Añosexpe`, `Nombrecurso`) VALUES (?)";
    console.log(req.body)
    const vlaues = [
        req.body.nombre,
        req.body.apellido,
        req.body.tituloa,
        req.body.añosexpe,
        req.body.nombrecurso,
    ]
    db.query(sql, [vlaues], (err, result) => {
        handleResponse(res, err, result);
    })
})

app.get('/leerpro/:id', (req, res) => {
    const sql = "SELECT * FROM profesor WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        handleResponse(res, err, result);   
    })
})

app.put('/actualizarpro/:id', (req, res) => {
    const sql = "UPDATE profesor SET `Nombre` = ?, `Apellido` = ?, `TituloA` = ?, `Añosexpe` = ?,  `Nombrecurso` = ? WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [req.body.nombre, req.body.apellido, req.body.tituloa, req.body.añosexpe, req.body.nombrecurso, id], (err, result) => {
        handleResponse(res, err, result);   
    })
})

app.delete('/eliminarpro/:id', (req, res) => {
    const sql = "DELETE FROM profesor WHERE ID=?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        handleResponse(res, err, result);
    })
})

//LOGIN

app.post('/register', (req, res)=>{
    const sql = "INSERT INTO login (`Name`, `Lastname`, `Email`, `Password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM login WHERE `Email` = ? AND `Password` = ?";

    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Exito");
        } else {
            return res.json("Fracaso");
        }
    })
})


app.listen(8000, () => {
    console.log("Listening");
})