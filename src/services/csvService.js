const fs = require("fs");
const { parse } = require("@fast-csv/parse");

const validateOrder = require("./validationService");
const insertOrders = require("./orderService");

const BATCH_SIZE = 500;

async function parseCSV(filePath) {

    return new Promise((resolve, reject) => {

        let batch = [];
        let totalOrders = 0;
        let insertedOrders = 0;
        let invalidOrders = [];

        const parser = parse({ headers: true });

        parser.on("error", reject);

        parser.on("data", (row) => {

            totalOrders++;

            const validation = validateOrder(row);

            if (!validation.valid) {

                invalidOrders.push({
                    row,
                    reason: validation.reason
                });

                return;
            }

            batch.push(row);

        });

        parser.on("end", async () => {

            try {

                for (let i = 0; i < batch.length; i += BATCH_SIZE) {

                    const currentBatch = batch.slice(i, i + BATCH_SIZE);

                    await insertOrders(currentBatch);

                    insertedOrders += currentBatch.length;

                }

                resolve({
                    totalOrders,
                    insertedOrders,
                    invalidOrders
                });

            } catch (err) {

                reject(err);

            }

        });

        fs.createReadStream(filePath).pipe(parser);

    });

}

module.exports = parseCSV;