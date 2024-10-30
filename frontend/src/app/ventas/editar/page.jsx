"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditarVenta() {
  const router = useRouter();
  const [cantidad, setCantidad] = useState('');
  const [fechaYHora, setFechaYHora] = useState('');
  const [idProducto, setIdProducto] = useState('');
  const [idUsuario, setIdUsuario] = useState('');

  useEffect(() => {
    const fetchVenta = async () => {
      const idVenta = router.query.id; // Obtener el ID de la venta desde la URL
      
      // Verificar si idVenta está disponible
      if (!idVenta) return; // Si no hay ID, no continuar

      try {
        const response = await axios.get(`http://localhost:3000/ventas/${idVenta}`);
        const venta = response.data;
        setCantidad(venta.Cantidad); // Asegúrate de que las propiedades coincidan
        setFechaYHora(venta.FechaYHora);
        setIdProducto(venta.IdProducto);
        setIdUsuario(venta.IdUsuario);
      } catch (error) {
        console.error('Error al obtener la venta:', error);
      }
    };

    // Verifica que router.query tenga el ID antes de llamar a fetchVenta
    if (router.query && router.query.id) {
      fetchVenta();
    }
  }, [router.query]); // Observa cambios en router.query

  const handleActualizarVenta = async () => {
    const actualizarVenta = {
      Cantidad: cantidad,
      FechaYHora: fechaYHora,
      IdProducto: idProducto,
      IdUsuario: idUsuario,
    };

    try {
      await axios.put(`http://localhost:3000/ventas/${router.query.id}`, actualizarVenta);
      alert('Venta actualizada correctamente');
      router.push('/ventas/mostrar'); // Redirigir a la lista de ventas
    } catch (error) {
      console.error('Error al actualizar la venta:', error);
      alert('Hubo un error al actualizar la venta');
    }
  };

  return (
    <div>
      <h1>Editar Venta</h1>
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
        onChange={(e) => setIdProducto(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID Usuario"
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)}
      />
      <button onClick={handleActualizarVenta}>Actualizar Venta</button>
    </div>
  );
}
