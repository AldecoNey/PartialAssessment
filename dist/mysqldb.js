"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cxMysql = void 0;
const mysql_1 = require("mysql");
exports.cxMysql = (0, mysql_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'parcial2_lab',
    connectionLimit: 100 //100 es el valor por defecto
});
exports.cxMysql.query('CREATE TABLE IF NOT EXISTS vehiculo (id BIGINT AUTO_INCREMENT PRIMARY KEY, marca VARCHAR(100), modelo VARCHAR(100), nro_chasis BIGINT, matricula VARCHAR(100), precio DECIMAL(10, 2))', (error, results) => {
    if (error) {
        console.error('Error al crear la tabla vehiculo:', error);
    }
});
