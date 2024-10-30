"use client";
import React from 'react';
import axios from 'axios';

export default function Borrar({ tipoEntidad, id, onEliminar }) {
  const borrarElemento = async () => {
    try {
      // Revisa que `tipoEntidad` sea un string válido y que `id` no esté vacío
      if (!tipoEntidad || !id) {
        alert('Falta información para eliminar el elemento');
        return;
      }

      const url = `http://localhost:3000/${tipoEntidad}/${id}`;
      console.log(`Eliminando desde URL: ${url}`);  // Agrega un log para ver la URL que se está usando
      await axios.delete(url);

      alert('Elemento eliminado correctamente');
      if (onEliminar) onEliminar();  // Callback para actualizar la lista en el frontend
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      alert('Error al eliminar el elemento. Verifica la consola para más detalles.');
    }
  };

  return (
    <button onClick={borrarElemento} className="btn btn-danger">
      Borrar
    </button>
  );
}
