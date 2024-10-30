"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

// Importar Firebase y Firestore
// Asegúrate de importar Firestore
// Configuración de Firebase obtenida desde la consola de Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAr_PJWukQZqYpplZEsBQncMRDi7QADH5g",
  authDomain: "miejemplo-3b20f.firebaseapp.com",
  projectId: "miejemplo-3b20f",
  storageBucket: "miejemplo-3b20f.appspot.com",
  messagingSenderId: "53645074119",
  appId: "1:53645074119:web:df8ac7f4ff324177423ce3"
}; // Inicializar Firebase

var app = (0, _app.initializeApp)(firebaseConfig); // Inicializar Firestore

var db = (0, _firestore.getFirestore)(app); // Esto inicializa Firestore
// Exportar Firestore para usarlo en otros archivos

exports.db = db;
//# sourceMappingURL=firebase.dev.js.map
