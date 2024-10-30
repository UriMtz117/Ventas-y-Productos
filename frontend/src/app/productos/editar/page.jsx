"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditarProducto() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Obtener el ID del producto desde la URL

  useEffect(() => {
    // Función para obtener la información del producto a editar
    const fetchProducto = async () => {
      console.log('ID del producto recibido desde la URL:', id); // Depuración
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        const producto = response.data;
        setNombreProducto(producto.nombreProducto);
        setPrecio(producto.precio);
        setStatus(producto.status);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        alert('Hubo un error al obtener el producto');
      }
    };
  
    if (id) {
      fetchProducto();
    }
  }, [id]);

  const handleActualizarProducto = async () => {
    try {
      const productoActualizado = {
        nombreProducto,
        precio: parseFloat(precio),
        status,
      };

      const response = await axios.put(`http://localhost:3001/productos/${id}`, productoActualizado);

      if (response.status === 200) {
        alert('Producto actualizado correctamente');
        router.push('/productos/mostrar');
      } else {
        alert('Hubo un error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Hubo un error al actualizar el producto');
    }
  };

  return (
    <div>
      <h1>Editar Producto</h1>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={nombreProducto}
        onChange={(e) => setNombreProducto(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={handleActualizarProducto} className="btn btn-primary">
        Actualizar Producto
      </button>
    </div>
  );
}
