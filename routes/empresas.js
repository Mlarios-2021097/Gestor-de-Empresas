const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const {  postEmpresa,putEmpresa,deleteEmpresa,getEmpresa } = require('../controllers/empresa');
const { validarCampos } = require('../middlewares/validar-campos');

const {  correoExiste} = require('../helpers/db-validator');
const router = Router();
router.get('/',[
 
],getEmpresa);

router.post('/agregar',[
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo','No es un correo valido').isEmail(),
    check('password', 'La password es obligatorio').not().isEmpty(),
    check('nombreFomra', 'El tipo es obligatorio').not().isEmpty(),
    check('correo').custom(correoExiste),
    validarCampos,
],postEmpresa);

router.put('/update',[
    validarJWT,
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo','No es un correo valido').isEmail(),
    check('password', 'La password es obligatorio').not().isEmpty(),
    check('nombreFomra', 'El tipo es obligatorio').not().isEmpty(),
    check('correo').custom(correoExiste),
    validarCampos,
],putEmpresa);

router.delete('/delete', [
    validarJWT,

    validarCampos
] ,deleteEmpresa);





module.exports = router;