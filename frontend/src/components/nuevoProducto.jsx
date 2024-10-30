"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NuevoProducto() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleCrearProducto = async () => {
    // Validar que todos los campos estén llenos
    if (!nombreProducto || !precio || !status) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const nuevoProducto = {
        nombreProducto,
        precio: parseFloat(precio), // Asegúrate de convertir el precio a un número
        status,
      };

      // Verifica que la URL del endpoint sea correcta
      const response = await axios.post('http://localhost:3000/productos', nuevoProducto);
      console.log('Producto agregado:', response.data); // Verifica la respuesta del servidor

      alert('Producto agregado correctamente');
      router.push('/productos/mostrar');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Error al agregar el producto, revisa la consola para más detalles.');
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Producto</h1>
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
      <button onClick={handleCrearProducto} className="btn btn-primary">
        Agregar Producto
      </button>
    </div>
  );
}

