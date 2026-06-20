# Backend Engineering Assessment

## Overview

This project is a Backend Engineering Assessment built using **Node.js**, **Express.js**, and **PostgreSQL**.

The application provides an API to upload a CSV file containing order records. The uploaded data is validated, processed in batches, distributed across PostgreSQL shards based on customer ID, and stored efficiently using database transactions.

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Multer
- Fast CSV
- Google Cloud SDK
- Git
- Postman

---

# Features

- CSV File Upload API
- CSV Data Validation
- Batch Processing (500 records per batch)
- PostgreSQL Integration
- Database Sharding
- PostgreSQL Transactions
- Error Handling
- Modular Project Structure
- REST API

---

# Project Structure

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

# Database

The application uses two PostgreSQL shard tables.

```
orders_shard_1
orders_shard_2
```

## Sharding Logic

Customer IDs ending with:

- Even digit → `orders_shard_1`
- Odd digit → `orders_shard_2`

---

# API

## Upload Orders

```
POST /api/upload-orders
```

### Form Data

```
orderFile : orders.csv
```

### Example Response

```json
{
    "success": true,
    "totalOrders": 10000,
    "insertedOrders": 10000,
    "invalidOrders": []
}
```

---

# Validation

Each CSV record is validated before insertion.

Validation includes:

- order_id
- customer_id
- order_date
- order_amount
- status

Allowed Status Values:

- Pending
- Delivered
- Cancelled
- Processing

Invalid records are skipped and reported in the response.

---

# Batch Processing

Orders are inserted into PostgreSQL in batches of **500 records** to reduce database queries and improve insertion performance.

---

# Transactions

Each batch insertion runs inside a PostgreSQL transaction.

Flow:

```
BEGIN
↓
INSERT
↓
COMMIT
```

If any error occurs:

```
ROLLBACK
```

---

# Project Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file.

Example:

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=mypass
DB_NAME=orders_db
```

---

## Run the Server

```bash
npm run dev
```

---

# PostgreSQL Tables

Create the following tables before running the project:

```
orders_shard_1
orders_shard_2
```

Each table contains the following columns:

- order_id
- customer_id
- order_date
- order_amount
- status

---

# Google Cloud Storage

Google Cloud SDK was installed and authentication was configured successfully.

Cloud Storage bucket creation and integration could not be completed because Google Cloud billing could not be activated on the account during the assessment period.

The remaining GCS integration can be completed once billing is enabled.

---

# Notes

This assessment was completed as a learning-focused backend project.

Several technologies used in this assessment—including PostgreSQL, sharding, transactions, batch processing, and Google Cloud—were new to me. I used AI-assisted learning together with official documentation to understand these concepts while implementing and testing the solution locally.

---

# Author

**Ravi Siddhapura**

Backend Engineering Assessment
