import Alumno from "./models/alumnos.js";

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
  console.log("dfghjk")
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

  const fecha = new Date(ano, mes - 1, dia);

  if (
    fecha.getFullYear() != ano ||
    fecha.getMonth() != mes - 1 ||
    fecha.getDate() != dia
  ) {
    return res.status(400).send("Fecha inválida");
  }

  res.status(200).send("Fecha válida");
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






app.get("/omdb-wrapper/Searchcomplete", async (req, res) => {
  const { search, p } = req.query;

  try {
    const resultado = await OMDBSearchComplete(search, p);

    res.status(200).json(resultado || []);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar películas" });
  }
});


const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

app.get("/alumnos", (req, res) => {
  res.status(200).json(alumnosArray);
});





app.get("/alumnos/:dni", (req, res) => {
  const { dni } = req.params;

  const alumno = alumnosArray.find(a => a.dni === dni);

  if (!alumno) {
    return res.status(404).send("Alumno no existe");
  }

  res.status(200).json(alumno);
});



app.post("/alumnos", (req, res) => {
  const { username, dni, edad } = req.body;

  if (!username || !dni || !edad) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const existe = alumnosArray.find(a => a.dni === dni);

  if (existe) {
    return res.status(400).json({ error: "El alumno ya existe" });
  }

  const nuevoAlumno = new Alumno(username, dni, edad);

  alumnosArray.push(nuevoAlumno);

  res.status(201).json(nuevoAlumno);
});




app.delete("/alumnos/:dni", (req, res) => {
  const { dni } = req.params;

  const alumnoAEliminar = alumnosArray.findIndex(a => a.dni === dni);

  if (alumnoAEliminar === -1) {
    return res.status(404).json({ error: "Alumno no existe" });
  }

  const eliminado = alumnosArray.splice(alumnoAEliminar, 1);

  res.status(200).json(eliminado[0]);
});