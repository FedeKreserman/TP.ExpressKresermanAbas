import Alumno from "./models/alumno.js";

import { sumar, restar, multiplicar, dividir } from "./modules/matematica.js";

import {
  OMDBSearchByPage,
  OMDBSearchComplete,
  OMDBGetByImdbID,
} from "./modules/omdb-wrapper.js";
import express from "express";
// hacer npm i express
import cors from "cors";
// hacer npm i cors
const app = express();
const port = 3000;
// El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors());
// Middleware de CORS
app.use(express.json());
// Middleware para parsear y comprender JSON
// Aca pongo todos los EndPoints
app.get("/", (req, res) => {
  res.send("Ya estoy respondiendo!");
  // EndPoint",
});

app.get("/saludar", (req, res) => {
  res.send("Hello World!");
  // EndPoint "/saludar"
});
// Inicio el Server y lo pongo a escuchar.
//

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/saludar", (req, res) => {
  res.send("Hello World!");
});

app.get("/saludar/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  res.status(200).send(`Hola ${nombre}!`);
});

app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
  const { ano, mes, dia } = req.params;

  const fechaString = `${ano}-${mes}-${dia}`;
  const fecha = Date.parse(fechaString);

  if (isNaN(fecha)) {
    res.status(400).send("Fecha inválida");
  } else {
    res.status(200).send("Fecha válida");
  }
});

app.get("/matematica/sumar", (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = sumar(Number(n1), Number(n2));

  res.status(200).send(`Resultado: ${resultado}`);
});

app.get("/matematica/restar", (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = restar(Number(n1), Number(n2));

  res.status(200).send(`Resultado: ${resultado}`);
});
app.get("/matematica/multiplicar", (req, res) => {
  const { n1, n2 } = req.query;
  const resultado = multiplicar(Number(n1), Number(n2));

  res.status(200).send(`Resultado: ${resultado}`);
});

app.get("/matematica/dividir", (req, res) => {
  const { n1, n2 } = req.query;

  const num1 = Number(n1);
  const num2 = Number(n2);

  if (num2 === 0) {
    return res.status(400).send("El divisor no puede ser cero");
  }

  const resultado = dividir(num1, num2);

  res.status(200).send(`Resultado: ${resultado}`);
});

app.get("/omdb-wrapper/searchbypage", async (req, res) => {
  const { search, p } = req.query;

  try {
    const resultado = await OMDBSearchByPage(search, p);

    res.status(200).json(resultado || []);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar películas" });
  }
});

app.get("/ondb-wrapper/")
