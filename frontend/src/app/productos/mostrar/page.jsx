"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BorrarProducto from '../../../components/borrarProducto';

export default function MostrarProductos() {
  const [productos, setProductos] = useState([]);
  const router = useRouter();

  // Función para obtener la lista de productos
  const fetchProductos = async () => {
    try {
      const resultado = await axios.get('http://localhost:3000/productos');
      setProductos(resultado.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Obtener productos al montar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Producto</th>
            <th>Precio</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombreProducto}</td>
              <td>{producto.precio}</td>
              <td>{producto.status}</td>
              <td>
                <button 
                  onClick={() => router.push(`/productos/editar?id=${producto.id}`)} 
                  className="btn btn-primary"
                >
                  Editar
                </button>
                <BorrarProducto id={producto.id} onEliminar={fetchProductos} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={() => router.push('/productos/nuevo')} 
        className="btn btn-success"
      >
        Nuevo Producto
      </button>
    </div>
  );
}
