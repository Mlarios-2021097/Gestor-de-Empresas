const {response, request } = require('express');
const bcrypt = require('bcryptjs');
const Empresea = require('../models/empresas');
  
const getEmpresa = async (res = response) => {

    const query = { estado: true};   
    const listaEmpresas = await Promise.all([
        Empresea.countDocuments(query),
        Empresea.find(query),
        
    ]);
    
    res.json({
        msg: listaEmpresas,

    });
}

const postEmpresa = async (req = request, res = response) => {

    const { correo, password, nombreFomra} = req.body;
    const GuardadoDB = new Empresea({correo, password, nombreFomra });

    const salt = bcrypt.genSaltSync();
    GuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await GuardadoDB.save();
 

    res.json({
        msg: 
        GuardadoDB,
        
        
    });

}

const putEmpresa = async (req = request, res = response) => {
    const _idEmpresa = req.empresa.id
    const { ...resto} = req.body;
    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const EmpresaEditado = await Empresea.findByIdAndUpdate(_idEmpresa, resto, { new: true });

    res.json({
        msg: EmpresaEditado
    });
}  
const deleteEmpresa = async(req = request, res = response) => {
    const _idEmpresa = req.empresa.id

    
     const EmpreseaEliminado = await Empresea.findByIdAndUpdate(_idEmpresa, { estado: false });
    
    res.json({
        msg: 'DELETE eliminar user',
        EmpreseaEliminado
    });
}

module.exports = {
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    getEmpresa,
}