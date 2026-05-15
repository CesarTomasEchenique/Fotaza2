const { Pool } = require("pg");

const base = new Pool({
    user:"admin",
    host: "localhost",
    database: "mydatabase",
    password: "admin",
    port:5432
});

module.exports = base;