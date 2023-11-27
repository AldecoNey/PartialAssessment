"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarVehiculo = exports.buscarVehiculo = exports.modificarVehiculo = exports.crearVehiculo = exports.getVehiculosXID = exports.getVehiculos = void 0;
const path_1 = __importDefault(require("path"));
const mysqldb_1 = require("../mysqldb");
const getVehiculos = (req, res) => new Promise((resolve, reject) => {
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("SELECT * FROM vehiculo", (err, results) => {
            if (err) {
                res.json(err);
            }
            else {
                res.send(results);
            }
        });
    });
});
exports.getVehiculos = getVehiculos;
const getVehiculosXID = (req, res) => new Promise((resolve, reject) => {
    const idVehiculo = parseInt(req.params.id);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("SELECT * FROM vehiculo WHERE id = ?", [idVehiculo], (err, results) => {
            if (err) {
                res.json(err);
            }
            else {
                res.send(results);
            }
        });
    });
});
exports.getVehiculosXID = getVehiculosXID;
const crearVehiculo = (req, res) => new Promise((resolve, reject) => {
    const { marca, modelo, nro_chasis, matricula, precio } = req.body;
    var values = [marca, modelo, nro_chasis, matricula, precio];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "INSERT INTO vehiculo(marca, modelo, nro_chasis, matricula, precio) VALUES (?, ?, ?, ?, ?)";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    const indexPath = path_1.default.join(__dirname, "../../vista/index.html");
                    res.sendFile(indexPath);
                }
            });
        }
    });
});
exports.crearVehiculo = crearVehiculo;
const modificarVehiculo = (req, res) => new Promise((resolve, reject) => {
    const { id, marca, modelo, nro_chasis, matricula, precio } = req.body;
    var values = [marca, modelo, nro_chasis, matricula, precio, id];
    console.log(values);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = "UPDATE vehiculo SET marca=?, modelo=?, nro_chasis=?, matricula=?, precio=? WHERE id=?";
            connection.query(sql, values, (err, results) => {
                if (err) {
                    res.json({ message: "Error al modificar " + err });
                }
                else {
                    const indexPath = path_1.default.join(__dirname, "../../vista/index.html");
                    res.sendFile(indexPath);
                }
            });
        }
    });
});
exports.modificarVehiculo = modificarVehiculo;
const buscarVehiculo = (req, res) => {
    const { marcaBusqueda, matriculaBusqueda } = req.query;
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        let query = "SELECT * FROM vehiculo WHERE marca = ? OR matricula = ?";
        let values = [marcaBusqueda, matriculaBusqueda];
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            res.send(results);
        });
    });
};
exports.buscarVehiculo = buscarVehiculo;
const eliminarVehiculo = (req, res) => new Promise((resolve, reject) => {
    const idVehiculo = parseInt(req.params.id);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query("DELETE FROM vehiculo WHERE id = ?", [idVehiculo], (err, results) => {
            if (err) {
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.json({ message: "Vehiculo Eliminado con exito" });
            }
        });
    });
});
exports.eliminarVehiculo = eliminarVehiculo;
