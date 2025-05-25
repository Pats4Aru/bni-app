import cors from "cors";
import express from "express";
import mysql from "mysql2";
import dotenv from 'dotenv';

dotenv.config({ path: "../.env"});

const app = express();
const port = 3002;
app.use(cors());
console.log("server recieves request");

const connection = mysql.createConnection({ 
   host: process.env.HOST,
   user: process.env.USER,
   password: process.env.PASSWORD, 
   database: process.env.DATABASE,
});


app.get("/members", (req, res) => {
   connection.query('SELECT * FROM members', (error, results, fields) => {
      if (error) {
         console.log("Error parsing SQL database" + error);
         res.status(500).json({error : "Database query failed"})
      }
      console.log(results);
      res.json(results);
   })
})

app.listen(port, () => {
   console.log(`Server listening on ${port}`);
});