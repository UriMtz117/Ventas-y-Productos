// Importar Firebase y Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Asegúrate de importar Firestore

// Configuración de Firebase obtenida desde la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAr_PJWukQZqYpplZEsBQncMRDi7QADH5g",
  authDomain: "miejemplo-3b20f.firebaseapp.com",
  projectId: "miejemplo-3b20f",
  storageBucket: "miejemplo-3b20f.appspot.com",
  messagingSenderId: "53645074119",
  appId: "1:53645074119:web:df8ac7f4ff324177423ce3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);  // Esto inicializa Firestore

// Exportar Firestore para usarlo en otros archivos
export { db };