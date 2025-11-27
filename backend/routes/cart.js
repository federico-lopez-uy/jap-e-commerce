import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const items = req.body.items; // items del carrito

    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: "Formato inválido" });
    }

    try {
        const conn = await pool.getConnection();

        for (let item of items) {
            await conn.query(
                `INSERT INTO carrito_item (ID_Producto, Cantidad) VALUES (?, ?)`,
                [item.id, item.cantidad]
            );
        }

        conn.release();
        res.json({ message: "Carrito guardado correctamente" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al guardar el carrito" });
    }
});

export default router;
