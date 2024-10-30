"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function MostrarVentas() {
  const [ventas, setVentas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/ventas');
        setVentas(respuesta.data);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    obtenerVentas();
  }, []);

  const handleEliminarVenta = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
      try {
        await axios.delete(`http://localhost:3000/ventas/${id}`);
        setVentas(ventas.filter(venta => venta.id !== id));
        alert('Venta eliminada correctamente');
      } catch (error) {
        console.error('Error al eliminar la venta:', error);
      }
    }
  };

  return (
    <div>
      <h1>Ventas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cantidad</th>
            <th>Fecha y Hora</th>
            <th>ID Producto</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length === 0 ? (
            <tr>
              <td colSpan="6">No hay ventas registradas.</td>
            </tr>
          ) : (
            ventas.map(venta => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.fechaYHora}</td>
                <td>{venta.idProducto}</td>
                <td>{venta.idUsuario}</td>
                <td>
                  <button onClick={() => router.push(`/ventas/editar?id=${venta.id}`)}>Editar</button>
                  <button onClick={() => handleEliminarVenta(venta.id)}>Borrar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button onClick={() => router.push('/ventas/nuevo')}>Nueva Venta</button>
    </div>
  );
}



