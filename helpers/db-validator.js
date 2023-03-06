const Tipo = require('../models/tipo');
const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresas');


const existeAsignacionPorId = async(id) => {

    const existeSucursal = await Sucursal.findById(id);

    if ( !existeSucursal ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}
const correoExiste = async(correo = '')=>{
    const existeEmail = await Empresa.findOne( { correo } );

    if ( existeEmail ) {
        throw new Error(`El nombre: ${correo } ya existe y esta registrado en la DB`);
    }
}

const validarMunicipio = async(ubicado = '')=>{
    const municipios = [
        "amatitlán",
        "chinautla",
        "chuarrancho",
        "fraijanes",
        "guatemala",
        "mixco",
        "palencia",
        "san josé del golfo",
        "san josé pinula",
        "san juan sacatepéquez",
        "san miguel petapa",
        "san pedro ayampuc",
        "san pedro sacatepéquez",
        "san raymundo",
        "santa catarina pinula",
        "villa canales",
        "villa nueva"
    ];
    const ubicacion = ubicado.toLowerCase();
    
    
    if(!municipios.includes(ubicacion)){
        throw new Error(`El municipio no esta registrado en el departamento Guatemala`);
    }
    
    
}

module.exports = {
    correoExiste,
    existeAsignacionPorId,
    validarMunicipio
}
