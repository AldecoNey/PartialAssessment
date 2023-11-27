import express from "express";
import rutas from "./rutas";
import path from "path";

const app = express();

// Configurar Express para servir archivos estáticos desde la carpeta "vista"
app.use(express.static(path.join(__dirname, "vista")));
app.use("/styles", express.static(path.join(__dirname, "vista", "styles")));
// para transformar los datos a objetos json
app.use(express.json());
// transformar los datos de un formulario HTML a objetos JSON
app.use(express.urlencoded({ extended: false }));

app.use(rutas);

app.listen(3000, () => {
  console.log("Servidor en puerto 3000", 3000);
});
