import Alumno from "./models/alumno.js";


import ValidacionesHelper from "./modules/ValidacionesHelper.js";


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
  const nombre = ValidacionesHelper.getStringOrDefault(req.params.nombre, "Anónimo");
  res.status(200).send(`Hola ${nombre}!`);
});


app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
  const ano = ValidacionesHelper.getIntegerOrDefault(req.params.ano, 0);
  const mes = ValidacionesHelper.getIntegerOrDefault(req.params.mes, 0);
  const dia = ValidacionesHelper.getIntegerOrDefault(req.params.dia, 0);


  if (ano === 0 || mes === 0 || dia === 0) {
    return res.status(400).send("Parámetros inválidos");
  }


  const fecha = new Date(ano, mes - 1, dia);


  if (
    fecha.getFullYear() !== ano ||
    fecha.getMonth() !== mes - 1 ||
    fecha.getDate() !== dia
  ) {
    return res.status(400).send("Fecha inválida");
  }


  res.status(200).send("Fecha válida");
});






app.get("/matematica/sumar", (req, res) => {
  const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
  const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);


  if (n1 === null || n2 === null) {
    return res.status(400).send("Parámetros inválidos");
  }


  const resultado = sumar(n1, n2);
  res.status(200).send(`Resultado: ${resultado}`);
});
app.get("/matematica/restar", (req, res) => {
  const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
  const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);


  if (n1 === null || n2 === null) {
    return res.status(400).send("Parámetros inválidos");
  }


  const resultado = restar(n1, n2);
  res.status(200).send(`Resultado: ${resultado}`);
});






app.get("/matematica/multiplicar", (req, res) => {
   const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
  const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);


  if (n1 === null || n2 === null) {
    return res.status(400).send("Parámetros inválidos");
  }


  const resultado = multiplicar(n1, n2);
  res.status(200).send(`Resultado: ${resultado}`);
});


app.get("/matematica/dividir", (req, res) => {
  const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
  const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);


 
  if (n1 === null || n2 === null) {
    return res.status(400).send("Parámetros inválidos");
  }


  if (n2 === 0) {
    return res.status(400).send("El divisor no puede ser cero");
  }


  const resultado = dividir(n1, n2);


  res.status(200).send(`Resultado: ${resultado}`);
});










app.get("/omdb-wrapper/searchbypage", async (req, res) => {
  const search = ValidacionesHelper.getStringOrDefault(req.query.search, "");
  const p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);


  try {
    const resultado = await OMDBSearchByPage(search, p);
    res.status(200).json(resultado || []);
  } catch {
    res.status(500).json({ error: "Error al buscar películas" });
  }
});






app.get("/omdb-wrapper/searchcomplete", async (req, res) => {
  const search = ValidacionesHelper.getStringOrDefault(req.query.search, "");


  if (search === "") {
    return res.status(400).json({ error: "Falta parámetro search" });
  }


  try {
    const resultado = await OMDBSearchComplete(search);
    res.status(200).json(resultado || []);
  } catch {
    res.status(500).json({ error: "Error al buscar películas" });
  }
});


app.get("/omdb-wrapper/getbyimdbid", async (req, res) => {
  const imdbID = ValidacionesHelper.getStringOrDefault(req.query.imdbID, "");


  if (imdbID === "") {
    return res.status(400).json({ error: "Falta parámetro imdbID" });
  }


  try {
    const resultado = await OMDBGetByImdbID(imdbID);
    res.status(200).json(resultado || {});
  } catch {
    res.status(500).json({ error: "Error al obtener película" });
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
  const dni = ValidacionesHelper.getStringOrDefault(req.params.dni, "");


  const alumno = alumnosArray.find(a => a.dni === dni);


  if (!alumno) {
    return res.status(404).send("Alumno no existe");
  }


  res.status(200).json(alumno);
});


app.post("/alumnos", (req, res) => {
  const username = ValidacionesHelper.getStringOrDefault(req.body.username, "");
  const dni = ValidacionesHelper.getStringOrDefault(req.body.dni, "");
  const edad = ValidacionesHelper.getIntegerOrDefault(req.body.edad, 0);


  if (username === "" || dni === "" || edad === 0) {
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








  app.delete("/alumnos", (req, res) => {
    const dni = ValidacionesHelper.getStringOrDefault(req.body.dni, "");


    if (dni === "") {
      return res.status(400).json({ error: "Falta dni" });
    }


    const index = alumnosArray.findIndex(a => a.dni === dni);


    if (index === -1) {
      return res.status(404).json({ error: "Alumno no existe" });
    }


    const eliminado = alumnosArray.splice(index, 1);


    res.status(200).json(eliminado[0]);
  });

