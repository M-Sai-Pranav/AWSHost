

const express = require("express");
const app = express();
var path = require('path');
const mysql = require('mysql')
const cors = require('cors');
const { allowedNodeEnvironmentFlags } = require("process");
app.use(cors({origin: [`http://${process.env.DOMAIN}:3000` ]}));

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            :  `${process.env.DBHOST}`,
    user            :  `${process.env.DBUSER}`,
    password        : `${process.env.DBPASSWORD}`,
    database        : 'pranav'
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
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


// 3. domain name for the domainname
// 4. ngnix to eliminate port number.

// Domain name and Elasitic IP ( Register your own domain name and IP Address )  