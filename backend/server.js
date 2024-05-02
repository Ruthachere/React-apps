
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "user_auth"
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`username`, `email` , `password`) VALUES(?)";
    const values = [
         req.body.email,
        req.body.username,
        req.body.password
    ]
    

    db.query (sql, [values], (err, data) =>{
        if (err) {
          return res.json("Error");
        }
        return res.json(data);

    })
  
})
app.post('/login', (req, res) => {
    const sql = "INSERT INTO login (`username` , `password`) VALUES(?)";
    const values = [
        req.body.username,
        req.body.password
    ]
    

    db.query (sql, [values], (err, data) =>{
        if (err) {
          return res.json("Error");
        }
        
        else{
            if(data.length > 0){
                return res.json(data);
            }else{
                res.send({message: "WRONG USERNAME OR PASSWORD!"})
            }
        }

    })
  
})



app.listen(3001, () => {
    console.log("running backend server");
});