const express = require('express');
const router = express.Router();

// Ruta para obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const ventasSnapshot = await req.db.collection('Ventas').get();
    const ventas = ventasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Ruta para obtener una venta por ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await req.db.collection('Ventas').doc(req.params.id).get();
    if (doc.exists) {
      res.status(200).json({ id: doc.id, ...doc.data() });
    } else {
      res.status(404).json({ error: 'Venta no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener venta por ID:', error);
    res.status(500).json({ error: 'Error al obtener venta por ID' });
  }
});

// Ruta para agregar una nueva venta
router.post('/', async (req, res) => {
  try {
    const nuevaVenta = req.body;
    const docRef = await req.db.collection('Ventas').add(nuevaVenta);
    res.status(201).json({ id: docRef.id, ...nuevaVenta });
  } catch (error) {
    console.error('Error al agregar venta:', error);
    res.status(500).json({ error: 'Error al agregar venta' });
  }
});

// Ruta para actualizar una venta por ID
router.put('/:id', async (req, res) => {
  try {
    const actualizarVenta = req.body;
    if (Object.keys(actualizarVenta).length === 0) {
      return res.status(400).json({ error: 'El objeto de actualización no puede estar vacío' });
    }
    await req.db.collection('Ventas').doc(req.params.id).update(actualizarVenta);
    res.status(200).json({ message: 'Venta actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar venta:', error);
    res.status(500).json({ error: 'Error al actualizar venta' });
  }
});

// Ruta para eliminar una venta por ID
router.delete('/:id', async (req, res) => {
  try {
    await req.db.collection('Ventas').doc(req.params.id).delete();
    res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
});

module.exports = router;
