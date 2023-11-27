import { Request, Response } from "express";
import path from "path";
import { cxMysql } from "../mysqldb";

export const getVehiculos = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query("SELECT * FROM vehiculo", (err, results) => {
        if (err) {
          res.json(err);
        } else {
          res.send(results);
        }
      });
    });
  });

export const getVehiculosXID = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const idVehiculo = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query(
        "SELECT * FROM vehiculo WHERE id = ?",
        [idVehiculo],
        (err, results) => {
          if (err) {
            res.json(err);
          } else {
            res.send(results);
          }
        }
      );
    });
  });

export const crearVehiculo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const { marca, modelo, nro_chasis, matricula, precio } = req.body;
    var values = [marca, modelo, nro_chasis, matricula, precio];
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "INSERT INTO vehiculo(marca, modelo, nro_chasis, matricula, precio) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, values, (err, results) => {
          if (err) {
            res.json({ message: "Error al tratar de insertar" });
          } else {
            const indexPath = path.join(__dirname, "../../vista/index.html");
            res.sendFile(indexPath);
          }
        });
      }
    });
  });

export const modificarVehiculo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const { id, marca, modelo, nro_chasis, matricula, precio } = req.body;
    var values = [marca, modelo, nro_chasis, matricula, precio, id];
    console.log(values);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      } else {
        let sql: string =
          "UPDATE vehiculo SET marca=?, modelo=?, nro_chasis=?, matricula=?, precio=? WHERE id=?";
        connection.query(sql, values, (err, results) => {
          if (err) {
            res.json({ message: "Error al modificar " + err });
          } else {
            const indexPath = path.join(__dirname, "../../vista/index.html");
            res.sendFile(indexPath);
          }
        });
      }
    });
  });

export const buscarVehiculo = (req: Request, res: Response) => {
  const { marcaBusqueda, matriculaBusqueda } = req.query;

  cxMysql.getConnection((err, connection) => {
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

export const eliminarVehiculo = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    const idVehiculo = parseInt(req.params.id);
    cxMysql.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      connection.query(
        "DELETE FROM vehiculo WHERE id = ?",
        [idVehiculo],
        (err, results) => {
          if (err) {
            res.json({ message: "Error al tratar de Eliminar" });
          } else {
            res.json({ message: "Vehiculo Eliminado con exito" });
          }
        }
      );
    });
  });
