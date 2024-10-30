"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditarUsuario() {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Obtén el ID del usuario desde la URL

  useEffect(() => {
    // Función para obtener los datos del usuario a editar
    async function fetchUsuario() {
      try {
        const resultado = await axios.get(`http://localhost:3000/usuarios/${id}`);
        const usuarioData = resultado.data;
        setNombre(usuarioData.nombre);
        setUsuario(usuarioData.usuario);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    }

    if (id) {
      fetchUsuario();
    }
  }, [id]);

  // Función para manejar la actualización del usuario
  async function actualizarUsuario(e) {
    e.preventDefault();
    try {
      const data = { nombre, usuario };
      await axios.put(`http://localhost:3000/usuarios/${id}`, data);
      alert('Usuario actualizado con éxito');
      router.push('/usuarios/mostrar'); // Redirige a la página de lista de usuarios
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Hubo un error al actualizar el usuario');
    }
  }

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form onSubmit={actualizarUsuario}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}