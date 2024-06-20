/*
    Rutas de Usuariuos / Auth
    host + /api/auth    
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middlewares/field-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');


router.post(
  '/new', 
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser mayor de 6 caracteres').isLength({ min: 6 }),
    validateFields,
  ], 
  createUser 
);

router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser mayor de 6 caracteres').isLength({ min: 6 }),
    validateFields,
  ], 
  loginUser);

router.get('/renew', [validateJWT, ],revalidateToken);


module.exports = router;