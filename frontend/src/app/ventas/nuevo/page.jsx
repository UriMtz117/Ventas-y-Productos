"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NuevaVenta() {
  const [cantidad, setCantidad] = useState('');
  const [fechaYHora, setFechaYHora] = useState('');
  const [idProducto, setIdProducto] = useState(''); // Campo para el ID del producto
  const [idUsuario, setIdUsuario] = useState(''); // Campo para el ID del usuario
  const router = useRouter();

  const handleCrearVenta = async () => {
    try {
      const nuevaVenta = {
        cantidad: parseInt(cantidad, 10), // Convierte a entero
        fechaYHora,
        idProducto,
        idUsuario,
      };

      await axios.post('http://localhost:3000/ventas', nuevaVenta);
      
      alert('Venta agregada correctamente'); // Mensaje de confirmación
      router.push('/ventas/mostrar'); // Redirige a la lista de ventas
    } catch (error) {
      console.error('Error al agregar la venta:', error);
      alert('Error al agregar la venta, revisa la consola para más detalles');
    }
  };

  return (
    <div>
      <h1>Agregar Nueva Venta</h1>
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Fecha y Hora"
        value={fechaYHora}
        onChange={(e) => setFechaYHora(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID Producto"
        value={idProducto}
        onChange={(e) => setIdProducto(e.target.value)} // ID del producto ingresado
      />
      <input
        type="text"
        placeholder="ID Usuario"
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)} // ID del usuario ingresado
      />
      <button onClick={handleCrearVenta} className="btn btn-primary">
        Crear Venta
      </button>
    </div>
  );
}
