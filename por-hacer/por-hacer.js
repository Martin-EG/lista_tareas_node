
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if(err) console.log(err);
        else
            console.log("Base de datos guardada");
    })
}

const cargarDB = () => {
    
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}


const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );

    if( index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion);
    
    if( nuevoListado.length === listadoPorHacer.length) {
        return false;
    }
    else {
        guardarDB();
        return true;
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}