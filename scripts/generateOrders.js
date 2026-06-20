const { createObjectCsvWriter } = require("csv-writer");
const { v4: uuidv4 } = require("uuid");

const csvWriter = createObjectCsvWriter({
    path: "orders.csv",
    header: [
        { id: "order_id", title: "order_id" },
        { id: "customer_id", title: "customer_id" },
        { id: "order_date", title: "order_date" },
        { id: "order_amount", title: "order_amount" },
        { id: "status", title: "status" }
    ]
});

const statuses = [
    "Pending",
    "Delivered",
    "Cancelled",
    "Processing"
];

const orders = [];

for (let i = 1; i <= 10000; i++) {

    orders.push({

        order_id: uuidv4(),

        customer_id: `CUST${String(Math.floor(Math.random() * 1000) + 1).padStart(4, "0")}`,

        order_date: new Date(
            Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        ).toISOString(),

        order_amount: (Math.random() * 5000 + 100).toFixed(2),

        status: statuses[Math.floor(Math.random() * statuses.length)]

    });

}

csvWriter.writeRecords(orders)
    .then(() => {
        console.log("✅ orders.csv generated successfully!");
    });