"use strict";

var express = require('express');

var cors = require('cors');

var rutasUsuarios = require('./rutas/rutasUsuarios');

var rutasProductos = require('./rutas/rutasProductos');

var rutasVentas = require('./rutas/rutasVentas');

require('dotenv').config();

var admin = require('firebase-admin');

var serviceAccount = require('./keys.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://miejemplo-3b20f.firebaseio.com"
  });
}

var db = admin.firestore();
var app = express();
app.use(cors());
app.use(express.json()); // Middleware para pasar Firestore a las rutas

app.use(function (req, res, next) {
  req.db = db;
  next();
}); // Usar las rutas para usuarios, productos y ventas

app.use('/usuarios', rutasUsuarios);
app.use('/productos', rutasProductos);
app.use('/ventas', rutasVentas);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Servidor en funcionamiento en puerto ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
