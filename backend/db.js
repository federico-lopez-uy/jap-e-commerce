import mariadb from "mariadb";

export const pool = mariadb.createPool({
    host: "localhost",
    user: "root",      // tu usuario
    password: "",      // tu contraseña si tenés
    database: "ecommerce",  // nombre de la base
    connectionLimit: 5
});
