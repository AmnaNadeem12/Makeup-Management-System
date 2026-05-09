#  Makeup Product Management System

A full-stack e-commerce-style web app for browsing makeup products, placing orders, and tracking or cancelling them in real time. Built with a RESTful Node.js/Express backend, SQL Server stored procedures, and a clean HTML/CSS frontend.

---

##  Features

- **Product Browsing** — View available makeup products with details and pricing
- **Order Placement** — Add products to orders and submit them seamlessly
- **Real-Time Order Tracking** — Track the live status of placed orders
- **Order Cancellation** — Cancel orders directly from the UI
- **RESTful API** — Clean, structured API routes covering the full order lifecycle
- **Stored Procedures** — All database interactions use stored procedures to ensure data integrity
- **Postman Collection** — Included for easy API testing

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | SQL Server (T-SQL) |
| API Testing | Postman |

---

## 📁 Project Structure

```
Makeup-Management-System/
├── backend/
│   ├── routes/         # Express route handlers (products, orders)
│   ├── db/             # SQL Server connection & SP calls
│   └── server.js       # App entry point
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js          # Frontend logic
├── makeup.sql                          # Database schema
├── table-data-sp.sql                   # Seed data & stored procedures
├── localhost-3000.postman_collection.json  # Postman API collection
└── .gitignore
```

---

##  Getting Started

### Prerequisites

- Node.js (v18+)
- SQL Server (local instance or SSMS)

### 1. Clone the repository

```bash
git clone https://github.com/AmnaNadeem12/Makeup-Management-System.git
cd Makeup-Management-System
```

### 2. Set up the database

Open **SQL Server Management Studio (SSMS)** and run the following files in order:

1. `makeup.sql` — creates the database and tables
2. `table-data-sp.sql` — inserts seed data and creates stored procedures

### 3. Configure environment variables

Create a `.env` file inside the `backend/` folder:

```env
DB_SERVER=localhost
DB_NAME=MakeupDB
DB_USER=your_username
DB_PASSWORD=your_password
PORT=3000
```

### 4. Install dependencies & start the server

```bash
cd backend
npm install
npm start
```

Open `frontend/index.html` in your browser to use the app.

---

##  API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Fetch all products |
| GET | `/api/orders` | Fetch all orders |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/:id` | Get order status by ID |
| DELETE | `/api/orders/:id` | Cancel an order |

> Import `localhost-3000.postman_collection.json` into Postman to test all endpoints instantly.

---

##  Database Design

- **Products** table — stores product name, category, price, and stock
- **Orders** table — stores order details and current status
- **OrderItems** table — links products to orders (many-to-many)
- **Stored Procedures** — used for all create, read, and delete operations to prevent SQL injection and enforce business logic at the database level

---

##  Author

**Amna Nadeem**  
CS Undergraduate @ FAST NUCES Lahore  
[GitHub](https://github.com/AmnaNadeem12) · [LinkedIn](https://linkedin.com/in/amna-nadeem-b1849531a) · amnandz123@gmail.com
