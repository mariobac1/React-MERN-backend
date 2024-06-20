const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

const createUser = async( req, res = response ) => {

  const { email, password } =  req.body;

  try {
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ 
        ok: false,
        msg: 'Email already in use.' });
    }
    
    user = new User( req.body );

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);
  
    await user.save();

    // Generar JWT
    const token = await generarJWT( user.id, user.name );
  
    res.status(201).json({
      ok:true,
      uid: user.id,
      name: user.name,
      msg: 'register',
      token
    });    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg:  'Por favor hable con el administrador'
    });
  }
};


const loginUser =  async(req, res = response) => {

  const { email, password } =  req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ 
        ok: false,
        msg: 'Email incorrecto' });
    }

    // Confirmar los passwords
    const validPasword = bcrypt.compareSync( password , user.password ) ;
    if(!validPasword){  
      return res.status(400).json({  
        ok: false,
        msg:'Contraseña incorrecta'
      });
    }

    //Generar JWT
    const token = await generarJWT( user.id, user.name );

    res.json({
      ok:true,
      uid: user.id,
      name: user.name,
      msg:'Login',
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:true,
      msg:'Login',
    });

  }  
  
};

const revalidateToken = async(req, res = response) => {

  const { uid, name } = req;  

  //Generar JWT
  const token = await generarJWT( uid, name );

  res.json({
    ok:true,
    uid,
    name,
    token,
    msg: 'renew',
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};