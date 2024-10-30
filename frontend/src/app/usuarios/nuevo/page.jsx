"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NuevoUsuario() {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const nuevoUsuario = {
        nombre,
        usuario,
        password,
      };

      await axios.post('http://localhost:3000/usuarios', nuevoUsuario);
      
      // Mostrar el mensaje de éxito y redirigir
      alert('Usuario creado correctamente');
      router.push('/usuarios/mostrar'); // Redirige a la lista de usuarios
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Hubo un error al crear el usuario');
    }
  };

  return (
    <div>
      <h1>Nuevo Usuario</h1>
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
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreate} className="btn btn-success">
        Crear Usuario
      </button>
    </div>
  );
}
