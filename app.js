

const express = require("express");
const app = express();
var path = require('path');
const mysql = require('mysql')
const cors = require('cors');
app.use(cors({origin: ['http://localhost:3000' ]}));

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'pranav',
    database        : 'pranav'
  });

app.get("/", (req, res) => {
    res.sendFile(path.resolve('hello.html'));
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/index', (req, res) => {
    const a = new Date().valueOf()
    pool.query(`INSERT INTO Persons ( Name, Country )
                VALUES ( ?, ? ) `, 
                [  'Pranav', a ], 
                (error, results, fields) => {
                    if(error) throw error;
                    console.log("Data inserted into Persons table--->", results);
                    res.status(200);
                    res.send("Data inserted into Persons table");
    })
    // console.log(req.body)
})


app.get("/hello", (req, res) => {
    res.sendFile(path.resolve('index.html'));
    });
app.listen(3000, () => {
console.log("Listening to port 3000");
});