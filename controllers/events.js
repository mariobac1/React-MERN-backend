const { response } = require('express');
const Evento = require('../models/Events');

const getEventos = async(req, res = response ) => {
  
  const eventos = await Evento.find()
    .populate('user', 'name email');

  res.json({
    ok: true,
    eventos
  });
};


const crearEvento = async (req, res = response ) => {

  const evento = new Evento( req.body );

  try {

    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado
    });

  } catch ( error ) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }

};


const actualizarEventos = async(req, res = response ) => {

  const  eventoId = req.params.id;

  try {

    const evento = await Evento.findById( eventoId );
    const uid = req.uid;

    if ( !evento ) {
      return res. status(404).json({
        ok: false,
        msg: 'No existe el id'
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    };

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true });

    res.json({
      ok:true,
      evento: eventoActualizado
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false, 
      msg: 'Hable con el administrador' 
    });    
  }

};


const eliminarEventos = async(req, res = response ) => {
  const  eventoId = req.params.id;

  try {

    const evento = await Evento.findByIdAndUpdate( eventoId );
    const uid = req.uid;

    if ( !evento ) {
      return res. status(404).json({
        ok: false,
        msg: 'No existe el id'
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      });
    }

    
    await Evento.findByIdAndDelete( eventoId);

    res.json({
      ok:true,
      msg: 'Evento eliminado correctamente'
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false, 
      msg: 'Hable con el administrador' 
    });    
  }

};


module.exports = {
  getEventos,
  crearEvento,
  actualizarEventos,
  eliminarEventos
};