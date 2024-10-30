"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Usa esta importación si estás en una versión reciente de Next.js
import axios from 'axios';

export default function EditarUsuario() {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const router = useRouter();
  const id = router.query?.id; // Verifica si `query` está disponible

  useEffect(() => {
    async function fetchUsuario() {
      try {
        if (id) {
          const respuesta = await axios.get(`http://localhost:3000/usuarios/${id}`);
          const datos = respuesta.data;
          setNombre(datos.nombre);
          setUsuario(datos.usuario);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    }
    fetchUsuario();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const usuarioActualizado = {
        nombre,
        usuario,
      };
      await axios.put(`http://localhost:3000/usuarios/${id}`, usuarioActualizado);
      router.push('/usuarios/mostrar'); // Redirige a la lista de usuarios
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
}