const express = require('express');
const router = express.Router();

// Ruta para obtener todos los usuarios desde `miejemploBD`
router.get('/', async (req, res) => {
  try {
    const usuariosSnapshot = await req.db.collection('miejemploBD').get();
    const usuarios = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(usuarios);  // Envía la lista de usuarios en formato JSON
  } catch (error) {
    console.error('Error al obtener usuarios desde `miejemploBD`:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta para obtener un usuario por ID desde `miejemploBD`
router.get('/:id', async (req, res) => {
  try {
    const doc = await req.db.collection('miejemploBD').doc(req.params.id).get();
    if (doc.exists) {
      res.status(200).json({ id: doc.id, ...doc.data() });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID desde `miejemploBD`:', error);
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
});

// Ruta para agregar un nuevo usuario a `miejemploBD`
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = req.body;
    const docRef = await req.db.collection('miejemploBD').add(nuevoUsuario);
    res.status(201).json({ id: docRef.id, ...nuevoUsuario });
  } catch (error) {
    console.error('Error al agregar usuario a `miejemploBD`:', error);
    res.status(500).json({ error: 'Error al agregar usuario' });
  }
});

// Ruta para eliminar un usuario por ID en `miejemploBD`
router.delete('/:id', async (req, res) => {
  try {
    await req.db.collection('miejemploBD').doc(req.params.id).delete();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario desde `miejemploBD`:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Ruta para actualizar un usuario por ID en `miejemploBD`
router.put('/:id', async (req, res) => {
  try {
    const actualizarUsuario = req.body;

    // Verifica que el objeto no esté vacío
    if (Object.keys(actualizarUsuario).length === 0) {
      return res.status(400).json({ error: 'El objeto de actualización no puede estar vacío' });
    }

    const usuarioRef = req.db.collection('miejemploBD').doc(req.params.id);

    // Verifica si el documento existe antes de intentar actualizarlo
    const usuarioDoc = await usuarioRef.get();
    if (!usuarioDoc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Realiza la actualización
    await usuarioRef.update(actualizarUsuario);
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario en `miejemploBD`:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

module.exports = router;