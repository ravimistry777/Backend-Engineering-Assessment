# Backend Engineering Assessment

## Overview

This project is a Backend Engineering Assessment built using Node.js, Express.js and PostgreSQL.

The application allows users to upload a CSV file containing order records. It validates the data, processes it in batches, shards the data into multiple PostgreSQL tables based on customer ID, and stores the records efficiently.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Multer
- Fast CSV
- Google Cloud SDK (Configured)
- Git
- Postman

---

## Features

- Upload CSV files
- CSV validation
- Batch Inserts (500 records per batch)
- PostgreSQL Integration
- Data Sharding
- Error Handling
- Modular Folder Structure
- REST API

---

## Folder Structure

```
src/
│
├── controller/
│   └── orderController.js
│
├── database/
│   └── db.js
│
├── middleware/
│   └── upload.js
│
├── routes/
│   └── orderRoutes.js
│
├── services/
│   ├── csvService.js
│   ├── orderService.js
│   ├── shardService.js
│   └── validationService.js
│
├── uploads/
│
├── app.js
└── server.js
```

---

## Database

Two shard tables are used.

```
orders_shard_1
orders_shard_2
```

Sharding Logic

- Even customer IDs → orders_shard_1
- Odd customer IDs → orders_shard_2

---

## API

### Upload Orders

```
POST /api/upload-orders
```

Form Data

```
orderFile : orders.csv
```

Example Response

```json
{
  "success": true,
  "totalOrders": 10000,
  "insertedOrders": 10000,
  "invalidOrders": []
}
```

---

## Validation

Each record is validated for:

- order_id
- customer_id
- order_date
- order_amount
- status

Allowed Status

- Pending
- Delivered
- Cancelled
- Processing

---

## Batch Processing

Records are inserted into PostgreSQL in batches of **500** to improve insertion performance.

---

## Transactions

Each batch insertion is executed inside a PostgreSQL transaction.

- BEGIN
- INSERT
- COMMIT

If an error occurs:

- ROLLBACK

---

## Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file.

Example:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=orders_db
```

---

### Start Server

```
npm run dev
```

---

## PostgreSQL Tables

Create the following tables before running the project.

```
orders_shard_1
orders_shard_2
```

Each table contains:

- order_id
- customer_id
- order_date
- order_amount
- status

---

## Google Cloud Storage

Google Cloud SDK authentication was configured successfully.

Due to a Google Cloud billing activation issue on the account, Cloud Storage bucket creation could not be completed within the assessment timeframe. The backend has been structured so that GCS integration can be added easily once billing is enabled.

---

## Notes

This assessment was completed as a learning-focused backend project. Several technologies such as PostgreSQL, sharding, batch processing, transactions, and Google Cloud were new to me. I used AI-assisted learning along with official documentation to understand the concepts while implementing and testing the solution locally.

---

## Author

**Ravi Siddhapura**

Backend Engineering Assessment
