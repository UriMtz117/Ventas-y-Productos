"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditarVenta({ id }) {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [cantidad, setCantidad] = useState('');
  const [fechaYHora, setFechaYHora] = useState('');
  const [idProducto, setIdProducto] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpdate = async () => {
    try {
      const updatedVenta = {
        Cantidad: cantidad,
        FechaYHora: fechaYHora,
        IdProducto: idProducto,
        IdUsuario: idUsuario,
      };
      await axios.put(`http://localhost:3000/ventas/${id}`, updatedVenta);
      router.push('/ventas/mostrar');
    } catch (error) {
      console.error('Error al actualizar venta:', error);
    }
    toggleEditMode();
  };

  return editMode ? (
    <div>
      <input
        type="text"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <input
        type="text"
        placeholder="Fecha y Hora"
        value={fechaYHora}
        onChange={(e) => setFechaYHora(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID Producto"
        value={idProducto}
        onChange={(e) => setIdProducto(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID Usuario"
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)}
      />
      <button onClick={handleUpdate}>Guardar</button>
      <button onClick={toggleEditMode}>Cancelar</button>
    </div>
  ) : (
    <button onClick={toggleEditMode} className="btn btn-primary">Editar</button>
  );
}
