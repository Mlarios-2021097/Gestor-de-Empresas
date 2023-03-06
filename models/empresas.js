const { Schema, model } = require('mongoose');

const EmpresasSchema = Schema({
    correo: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    estado: {
        type : Boolean,
        default : true
    },
    nombreFomra: {
        type:String,
        required: true

    }

});


module.exports = model('Empresas', EmpresasSchema);