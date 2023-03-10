const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');

const Empresa = require('../models/empresas');

const login = async(req = request, res = response)=>{
    const { correo, password } = req.body;

    try {
        const empresa = await Empresa.findOne({ correo });
        if ( !empresa ) {
            return res.status(400).json({
                msg: 'usuario / Password no son correctos - (El nombre no existe jaja)'
            });
        }
        if ( !empresa.estado ) {
            return res.status(400).json({
                msg: 'usuario / Password no son correctos - estado: false'
            });
        }

        const validarPassword = bcrypt.compareSync( password, empresa.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'usuario / Password no son correctos - (password incorrecta)'
            });
        }
        const token = await generarJWT( empresa.id );
        let tipos= empresa.tipo;
        res.json({
            tipos,
            msg: 'Login PATH',
            correo, password,
            token,
       
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }
}

module.exports = {
    login
}