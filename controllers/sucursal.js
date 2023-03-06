const {response, request } = require('express');
const Surusal = require('../models/sucursal');
 
const getSucursal = async ( res = response) => {
    const query = { estado: true};   
    const lista = await Promise.all([
        Surusal.countDocuments(query),
        Surusal.find(query),     
    ]);   
    res.json({
        msg: lista,

    });
}

const getSucursaById = async (req = request, res = response) => {

    const {id} = req.params;

    const sucursal = await Surusal.findById(id);
   
    res.json({
        msg:  sucursal,

    });
}

const postSucursal = async (req = request, res = response) => {
     const { nombreSucursal,ubicacio} = req.body;
 
     
    const data = {
        nombreSucursal:nombreSucursal,
        empresa:req.empresa.id,
        ubicacio:ubicacio.toUpperCase(),
    }

    const sucursales = await Surusal(data);
     await sucursales.save();
  
 
     res.json({
         msg: sucursales,
         
         
     });
 
}

const putSucursal = async (req = request, res = response) => {
    const { id } = req.params;
    const {_id,...resto } = req.body; 

    const Editado = await Surusal.findByIdAndUpdate(id, resto,{new:true});

    res.json({
        msg: Editado
    });
}

const deleteSucursal = async (req = request, res = response) => {
    const { id } = req.params;

    const Eliminado = await Surusal.findByIdAndUpdate(id, { estado: false });
    
    res.json({
        msg: Eliminado
    });
}

module.exports = {
    getSucursaById,
    getSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal
}