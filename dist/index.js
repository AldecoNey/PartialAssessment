"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rutas_1 = __importDefault(require("./rutas"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Configurar Express para servir archivos estáticos desde la carpeta "vista"
app.use(express_1.default.static(path_1.default.join(__dirname, "vista")));
app.use("/styles", express_1.default.static(path_1.default.join(__dirname, "vista", "styles")));
// para transformar los datos a objetos json
app.use(express_1.default.json());
// transformar los datos de un formulario HTML a objetos JSON
app.use(express_1.default.urlencoded({ extended: false }));
app.use(rutas_1.default);
app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
});
