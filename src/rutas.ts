import {Router} from 'express'
import path from "path";
import {getVehiculos, getVehiculosXID, crearVehiculo, modificarVehiculo, eliminarVehiculo, buscarVehiculo} from './controlador/controlador'

const router = Router();

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../vista/index.html');
    res.sendFile(indexPath);
  });
router.get('/Vehiculos', getVehiculos);
router.get('/Vehiculos/:id', getVehiculosXID);
router.post('/agregarVehiculo', crearVehiculo);
router.post('/update', modificarVehiculo);
router.delete('/eliminarVehiculo/:id', eliminarVehiculo);
router.get("/buscarVehiculo", buscarVehiculo);

export default router;