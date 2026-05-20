import 'dotenv/config';
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'admin',
    database: process.env.DB_NAME || 'mydatabase',
    password: process.env.DB_PASSWORD || 'admin', // Si el .env falla, usa 'admin'
    port: process.env.DB_PORT || 5432
});

export default sequelize;