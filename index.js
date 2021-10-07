/*
    API REST
    NODE JS (Lenguaje de programación)
    Express (Servidor web) 
    Mongo Native Driver (Controlador)
    MongoDB (Base de datos)
    
*/

const express = require('express');
const log = require('morgan');
const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017';
app = express();

// Middleware
app.use(log('dev'));
app.use(bodyParser.json());

//Conexion a BD
mongo.connect(url, (err, con) => {
    //Colección
    const coleccionAlumnos = con.db('702nosql').collection('alumnos');

    //Error
    if(err){
        console.log('No se pudo conectar la URL: \x1b[31m', url)
    }

    //Rutas
    //1 Mostrar todos los estudiantes
    app.get('/alumnos', (req, res) => {
        coleccionAlumnos.find({}).toArray((err, alumnos) => {
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            return res.send(JSON.stringify(alumnos))
        })
    })

    //2 Mostrar todos los estudiantes
    app.post('/alumnos', (req, res) => {
        coleccionAlumnos.insert(req.body, (err, respuesta) =>{
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            return res.send(JSON.stringify(respuesta))
        })
    })

    //Inicializar servidor
    app.listen(3000, ()=>{
        console.log('Express server corriendo en el puesto 3000: \x1b[32m%s\x1b[0m','online');
    });
})


