import {createPool} from 'mysql'

export const cxMysql = createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'parcial2_lab',
    connectionLimit: 100 //100 es el valor por defecto
  });


  cxMysql.query('CREATE TABLE IF NOT EXISTS vehiculo (id BIGINT AUTO_INCREMENT PRIMARY KEY, marca VARCHAR(100), modelo VARCHAR(100), nro_chasis BIGINT, matricula VARCHAR(100), precio DECIMAL(10, 2))', (error, results) => {
    if (error) {
      console.error('Error al crear la tabla vehiculo:', error);
    }
  });