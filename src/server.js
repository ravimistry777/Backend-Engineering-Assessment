require("dotenv").config();

const app = require("./app");
const pool = require("../src/database/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        await pool.query("SELECT NOW()");

        console.log("PostgresSQL connected");

        app.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        })

    } catch (error) {
        console.error("database connection failed");
        console.error(error);
    }
}


startServer();