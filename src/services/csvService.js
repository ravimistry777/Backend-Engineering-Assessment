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

        const stream = fs.createReadStream(filePath);

        const parser = parse({ headers: true });

        parser.on("error", reject);

        parser.on("data", async (row) => {

            parser.pause();

            totalOrders++;

            const validation = validateOrder(row);

            if (!validation.valid) {

                invalidOrders.push({
                    row,
                    reason: validation.reason
                });

                parser.resume();
                return;
            }

            batch.push(row);

            if (batch.length >= BATCH_SIZE) {

                try {

                    await insertOrders(batch);

                    insertedOrders += batch.length;

                    batch = [];

                } catch (err) {

                    return reject(err);

                }

            }

            parser.resume();

        });

        parser.on("end", async () => {

            try {

                if (batch.length > 0) {

                    await insertOrders(batch);

                    insertedOrders += batch.length;

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

        stream.pipe(parser);

    });
}

module.exports = parseCSV;