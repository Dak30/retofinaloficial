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

app.listen(8004, () => {
    console.log("Listening");
})