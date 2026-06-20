const pool = require("../database/db");
const getShard = require("./shardService");

async function insertOrders(orders) {
    if (orders.length === 0) {
        return;
    }

    const shardData = {};

    for (const order of orders) {
        const table = getShard(order.customer_id);
        if (!shardData[table]) {
            shardData[table] = [];
        }
        shardData[table].push(order);
    }

    for (const tableName in shardData) {
        const shardOrders = shardData[tableName];

        const values = [];

        const placeholders = shardOrders.map((order, index) => {
            const offset = index * 5;

            values.push(
                order.order_id,
                order.customer_id,
                order.order_date,
                order.order_amount,
                order.status
            );

            return `($${offset + 1},$${offset + 2},$${offset + 3},$${offset + 4},$${offset + 5})`;
        });
        const query = `INSERT INTO ${tableName} (order_id , customer_id , order_date , order_amount , status) VALUES ${placeholders.join(",")}`;
        console.log(tableName, shardOrders.length);

        await pool.query(query, values);
        console.log("Inserted into", tableName);
    }
}

module.exports = insertOrders;