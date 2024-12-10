# B2B Product Management Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on http://localhost:3008

## API Endpoints

### User Management
```
POST /api/users
- Create new user
- Body: { "name": "string", "email": "string", "password": "string" }
- Returns: { user: {...}, token: "string" }

Eg :
    {
     "name": "vignesh",
     "email": "vignesh@gmail.com",
     "password": "vignesh00#"
    }
```


### Products (Protected Routes)
```
GET /api/products
- Get all products
- Headers: Authorization: Bearer <token>
- 
Eg: {
     "id": 1,
     "dataCategory": "Keyboard",
     "recordCount": 200,
     "fields": "k40,$10000,logitech"
    }

 
GET /api/products/:id
- Get product by ID
- Headers: Authorization: Bearer <token>
- Returns: Single product

POST /api/products
- Create new product
- Headers: Authorization: Bearer <token>
- Body: { "dataCategory": "string", "recordCount": number, "fields": "string" }
- Returns: Created product
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data_category TEXT NOT NULL,
  record_count INTEGER NOT NULL,
  fields TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```