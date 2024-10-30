"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router(); // Ruta para obtener todas las ventas

router.get('/', function _callee(req, res) {
  var ventasSnapshot, ventas;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('Ventas').get());

        case 3:
          ventasSnapshot = _context.sent;
          ventas = ventasSnapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          });
          res.status(200).json(ventas);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error al obtener ventas:', _context.t0);
          res.status(500).json({
            error: 'Error al obtener ventas'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Ruta para obtener una venta por ID

router.get('/:id', function _callee2(req, res) {
  var doc;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('Ventas').doc(req.params.id).get());

        case 3:
          doc = _context2.sent;

          if (doc.exists) {
            res.status(200).json(_objectSpread({
              id: doc.id
            }, doc.data()));
          } else {
            res.status(404).json({
              error: 'Venta no encontrada'
            });
          }

          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error al obtener venta por ID:', _context2.t0);
          res.status(500).json({
            error: 'Error al obtener venta por ID'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Ruta para agregar una nueva venta

router.post('/', function _callee3(req, res) {
  var nuevaVenta, docRef;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          nuevaVenta = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(req.db.collection('Ventas').add(nuevaVenta));

        case 4:
          docRef = _context3.sent;
          res.status(201).json(_objectSpread({
            id: docRef.id
          }, nuevaVenta));
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error('Error al agregar venta:', _context3.t0);
          res.status(500).json({
            error: 'Error al agregar venta'
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Ruta para actualizar una venta por ID

router.put('/:id', function _callee4(req, res) {
  var actualizarVenta;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          actualizarVenta = req.body;

          if (!(Object.keys(actualizarVenta).length === 0)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'El objeto de actualización no puede estar vacío'
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(req.db.collection('Ventas').doc(req.params.id).update(actualizarVenta));

        case 6:
          res.status(200).json({
            message: 'Venta actualizada correctamente'
          });
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error('Error al actualizar venta:', _context4.t0);
          res.status(500).json({
            error: 'Error al actualizar venta'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Ruta para eliminar una venta por ID

router["delete"]('/:id', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('Ventas').doc(req.params.id)["delete"]());

        case 3:
          res.status(200).json({
            message: 'Venta eliminada correctamente'
          });
          _context5.next = 10;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.error('Error al eliminar venta:', _context5.t0);
          res.status(500).json({
            error: 'Error al eliminar venta'
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;
//# sourceMappingURL=rutasVentas.dev.js.map
