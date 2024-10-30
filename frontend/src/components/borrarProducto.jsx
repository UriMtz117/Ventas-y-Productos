"use client";

import React from 'react';
import axios from 'axios';

export default function BorrarProducto({ id, onEliminar }) {
  const borrarProducto = async () => {
    try {
      const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
      if (!confirmacion) return;

      await axios.delete(`http://localhost:3000/productos/${id}`);
      
      alert('Producto eliminado correctamente'); // Mensaje de confirmación
      if (onEliminar) onEliminar(); // Actualizar la lista en el frontend
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <button onClick={borrarProducto} className="btn btn-danger">
      Borrar Producto
    </button>
  );
}
