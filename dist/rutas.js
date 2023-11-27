"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const controlador_1 = require("./controlador/controlador");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const indexPath = path_1.default.join(__dirname, '../vista/index.html');
    res.sendFile(indexPath);
});
router.get('/Vehiculos', controlador_1.getVehiculos);
router.get('/Vehiculos/:id', controlador_1.getVehiculosXID);
router.post('/agregarVehiculo', controlador_1.crearVehiculo);
router.post('/update', controlador_1.modificarVehiculo);
router.delete('/eliminarVehiculo/:id', controlador_1.eliminarVehiculo);
router.get("/buscarVehiculo", controlador_1.buscarVehiculo);
exports.default = router;
