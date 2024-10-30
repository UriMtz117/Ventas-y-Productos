"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Borrar from '../../../components/borrar'; // Ruta corregida

export default function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  // Función para obtener la lista de usuarios
  const fetchData = async () => {
    try {
      const resultado = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(resultado.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Editar / Borrar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.usuario}</td>
              <td>
                {/* Botón para editar */}
                <button onClick={() => router.push(`/usuarios/editar?id=${usuario.id}`)} className="btn btn-primary">
                  Editar
                </button>
                {/* Botón para borrar */}
                <Borrar
                  tipoEntidad="usuarios" // Aquí indicamos que vamos a borrar un usuario
                  id={usuario.id}
                  onEliminar={fetchData} // Recargar la lista después de eliminar
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para agregar un nuevo usuario */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/usuarios/nuevo')} className="btn btn-success">
          Nuevo Usuario
        </button>
      </div>
    </div>
  );
}