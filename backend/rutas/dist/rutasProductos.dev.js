"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router(); // Ruta para obtener todos los productos

router.get('/', function _callee(req, res) {
  var productosSnapshot, productos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('productos').get());

        case 3:
          productosSnapshot = _context.sent;
          productos = productosSnapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          });
          res.status(200).json(productos);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error al obtener productos:', _context.t0);
          res.status(500).json({
            error: 'Error al obtener productos'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Ruta para obtener un producto por ID

router.get('/:id', function _callee2(req, res) {
  var productoId, doc;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          productoId = req.params.id;
          console.log('ID recibido para obtener producto:', productoId); // Depuración

          _context2.next = 5;
          return regeneratorRuntime.awrap(req.db.collection('productos').doc(productoId).get());

        case 5:
          doc = _context2.sent;

          if (doc.exists) {
            res.status(200).json(_objectSpread({
              id: doc.id
            }, doc.data()));
          } else {
            res.status(404).json({
              error: 'Producto no encontrado'
            });
          }

          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Error al obtener producto por ID:', _context2.t0);
          res.status(500).json({
            error: 'Error al obtener producto por ID'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Ruta para agregar un nuevo producto

router.post('/', function _callee3(req, res) {
  var nuevoProducto, docRef;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          nuevoProducto = req.body; // Asegúrate de que se esté accediendo a la colección correcta

          _context3.next = 4;
          return regeneratorRuntime.awrap(req.db.collection('productos').add(nuevoProducto));

        case 4:
          docRef = _context3.sent;
          res.status(201).json(_objectSpread({
            id: docRef.id
          }, nuevoProducto));
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error('Error al agregar producto:', _context3.t0);
          res.status(500).json({
            error: 'Error al agregar producto'
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Ruta para actualizar un producto por ID

router.put('/:id', function _callee4(req, res) {
  var id, productoActualizado;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          productoActualizado = req.body; // Verifica que el objeto de actualización no esté vacío

          if (!(Object.keys(productoActualizado).length === 0)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'El objeto de actualización no puede estar vacío'
          }));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(req.db.collection('productos').doc(id).update(productoActualizado));

        case 7:
          res.status(200).json({
            message: 'Producto actualizado correctamente'
          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error('Error al actualizar producto:', _context4.t0);
          res.status(500).json({
            error: 'Error al actualizar producto'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Ruta para eliminar un producto por ID

router["delete"]('/:id', function _callee5(req, res) {
  var productoId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          productoId = req.params.id;
          console.log('ID recibido para eliminar producto:', productoId); // Depuración

          _context5.next = 5;
          return regeneratorRuntime.awrap(req.db.collection('productos').doc(productoId)["delete"]());

        case 5:
          res.status(200).json({
            message: 'Producto eliminado correctamente'
          });
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error('Error al eliminar producto:', _context5.t0);
          res.status(500).json({
            error: 'Error al eliminar producto'
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;
//# sourceMappingURL=rutasProductos.dev.js.map
