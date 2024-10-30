"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BorrarVenta({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Mostrar ventana de confirmación
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta venta?');

    if (confirmDelete) {
      try {
        // Realizar la eliminación si el usuario confirma
        await axios.delete(`http://localhost:3000/ventas/${id}`);
        alert('Venta eliminada correctamente'); // Mostrar mensaje de éxito
        router.push('/ventas/mostrar'); // Redirigir a la lista de ventas
      } catch (error) {
        console.error('Error al borrar venta:', error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">Borrar Venta</button>
  );
}
