const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3005;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    return console.error("Error conectando a la base de datos", err);
  }
  console.log("Conectado a la BD");
});

app.get("/api/usuariosCustom", (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send("Error al obtener los usuarios de la base de datos", err);
    }
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log("Server Microservice is running on port", PORT);
});

app.get("/api/productos", (req, res) => {
  res.json({
    data: [
      { producto: "t-shirts", quantity: 130 },
      { producto: "Tazas", quantity: 32 },
    ],
  });
});
