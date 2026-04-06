
import Alumno from "./models/alumno.js"

import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import express from "express";
// hacer npm i express
import cors
from "cors";
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
app.get('/', (req, res) => {
res.send('Ya estoy respondiendo!');
// EndPoint",
})


app.get('/saludar', (req, res) => {
res.send('Hello World!');
// EndPoint "/saludar"
})
// Inicio el Server y lo pongo a escuchar.
//



app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})




app.get('/saludar', (req, res) => {
res.send('Hello World!');

})


app.get('/saludar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.status(200).send(`Hola ${nombre}!`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const { ano, mes, dia } = req.params;

    const fechaString = `${ano}-${mes}-${dia}`;
    const fecha = Date.parse(fechaString);

    if (isNaN(fecha)) {
        res.status(400).send('Fecha inválida');
    } else {
        res.status(200).send('Fecha válida');
    }
});


app.get('/matematica/sumar?n1={numero}&n2={numero}',(req,res)=>{
    const {n1, n2} =req.query;
       const resultado = sumar(num1, num2);

    res.status(200).send(`Resultado: ${resultado}`);
});



app.get('/matematica/restar?n1={numero}&n2={numero}',(req,res)=>{
    const {n1, n2} =req.query;
       const resultado = restar(num1, num2);

    res.status(200).send(`Resultado: ${resultado}`);
});



app.get('/matematica/multiplicar?n1={numero}&n2={numero}',(req,res)=>{
    const {n1, n2} =req.query;
       const resultado = multiplicar(num1, num2);

    res.status(200).send(`Resultado: ${resultado}`);
});



app.get('/matematica/dividi?n1={numero}&n2={numero}',(req,res)=>{
    const {n1, n2} =req.query;
       const resultado = dividir(num1, num2);

    res.status(200).send(`Resultado: ${resultado}`);
});


