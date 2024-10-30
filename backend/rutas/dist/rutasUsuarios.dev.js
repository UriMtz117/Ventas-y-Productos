"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router(); // Ruta para obtener todos los usuarios desde `miejemploBD`

router.get('/', function _callee(req, res) {
  var usuariosSnapshot, usuarios;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('miejemploBD').get());

        case 3:
          usuariosSnapshot = _context.sent;
          usuarios = usuariosSnapshot.docs.map(function (doc) {
            return _objectSpread({
              id: doc.id
            }, doc.data());
          });
          res.status(200).json(usuarios); // Envía la lista de usuarios en formato JSON

          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error al obtener usuarios desde `miejemploBD`:', _context.t0);
          res.status(500).json({
            error: 'Error al obtener usuarios'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Ruta para obtener un usuario por ID desde `miejemploBD`

router.get('/:id', function _callee2(req, res) {
  var doc;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('miejemploBD').doc(req.params.id).get());

        case 3:
          doc = _context2.sent;

          if (doc.exists) {
            res.status(200).json(_objectSpread({
              id: doc.id
            }, doc.data()));
          } else {
            res.status(404).json({
              error: 'Usuario no encontrado'
            });
          }

          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error al obtener usuario por ID desde `miejemploBD`:', _context2.t0);
          res.status(500).json({
            error: 'Error al obtener usuario por ID'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Ruta para agregar un nuevo usuario a `miejemploBD`

router.post('/', function _callee3(req, res) {
  var nuevoUsuario, docRef;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          nuevoUsuario = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(req.db.collection('miejemploBD').add(nuevoUsuario));

        case 4:
          docRef = _context3.sent;
          res.status(201).json(_objectSpread({
            id: docRef.id
          }, nuevoUsuario));
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error('Error al agregar usuario a `miejemploBD`:', _context3.t0);
          res.status(500).json({
            error: 'Error al agregar usuario'
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Ruta para eliminar un usuario por ID en `miejemploBD`

router["delete"]('/:id', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(req.db.collection('miejemploBD').doc(req.params.id)["delete"]());

        case 3:
          res.status(200).json({
            message: 'Usuario eliminado correctamente'
          });
          _context4.next = 10;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.error('Error al eliminar usuario desde `miejemploBD`:', _context4.t0);
          res.status(500).json({
            error: 'Error al eliminar usuario'
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); // Ruta para actualizar un usuario por ID en `miejemploBD`

router.put('/:id', function _callee5(req, res) {
  var actualizarUsuario, usuarioRef, usuarioDoc;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          actualizarUsuario = req.body; // Verifica que el objeto no esté vacío

          if (!(Object.keys(actualizarUsuario).length === 0)) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            error: 'El objeto de actualización no puede estar vacío'
          }));

        case 4:
          usuarioRef = req.db.collection('miejemploBD').doc(req.params.id); // Verifica si el documento existe antes de intentar actualizarlo

          _context5.next = 7;
          return regeneratorRuntime.awrap(usuarioRef.get());

        case 7:
          usuarioDoc = _context5.sent;

          if (usuarioDoc.exists) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: 'Usuario no encontrado'
          }));

        case 10:
          _context5.next = 12;
          return regeneratorRuntime.awrap(usuarioRef.update(actualizarUsuario));

        case 12:
          res.status(200).json({
            message: 'Usuario actualizado correctamente'
          });
          _context5.next = 19;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          console.error('Error al actualizar usuario en `miejemploBD`:', _context5.t0);
          res.status(500).json({
            error: 'Error al actualizar usuario'
          });

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
});
module.exports = router;
//# sourceMappingURL=rutasUsuarios.dev.js.map
