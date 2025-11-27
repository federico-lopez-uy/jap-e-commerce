import express from "express";
import cartRoutes from "./routes/cart.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta del carrito
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
