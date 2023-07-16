

const express = require("express");
const app = express();
var path = require('path');
const mysql = require('mysql')
const cors = require('cors');
const { allowedNodeEnvironmentFlags } = require("process");
app.use(cors({origin: ['http://ec2-65-0-102-95.ap-south-1.compute.amazonaws.com:3000' ]}));

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'database-1.cyhbscucjjto.ap-south-1.rds.amazonaws.com',
    user            : 'admin',
    password        : 'pranavdb',
    database        : 'pranav'
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
console.log("Listening to port 3000", origin);
});

// 1. create dev and prod environments
// 2. ssh for git
// 3. domain name for the domainname
// 4. ngnix to eliminate port number.