# 🧳 TourSuite - Tour Management System Backend

Welcome to **TourSuite**, a robust and scalable backend solution designed for tour operators to manage tours, bookings, users, payments, and guides across Bangladesh. Built using Node.js, Express, and MongoDB, the system provides powerful APIs for web or mobile frontend clients, complete with OTP-based user registration, secure authentication, and payment integration.

---

## 🧭 Introduction

The **TourSuite-Tour-Management-System-Backend** is designed to be a backend powerhouse for a tourism business. It supports:

- User onboarding with OTP/email
- Tour listings, filtering, and search
- Online tour booking & secure payment
- Admin tools for full control over the platform
- Real-time stats and PDF invoices

---

## 📌 Overview

**Key Modules:**

- 🔐 Authentication via Email & Google OAuth
- 📦 REST APIs with RBAC (User, Admin, Guide)
- 🧾 Booking & Tour Management
- 💳 Payment Gateway Integration (SSLCommerz)
- 🧠 Admin Panel Support
- 📊 Reporting APIs

---

## 🚀 Features

✅ User registration with OTP & Google OAuth  
✅ Tour creation, updates, and image uploads  
✅ Booking management with payment verification  
✅ Admin dashboard for monitoring and control  
✅ OTP and email notifications  
✅ PDF invoice generation  
✅ Scalable with Redis & MongoDB  
✅ MVC code architecture

---

## 🛠️ Tech Stack

| Package                     | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `@types/ejs`                | TypeScript definitions for EJS                 |
| `@types/multer`             | TypeScript definitions for Multer              |
| `@types/nodemailer`         | TypeScript definitions for Nodemailer          |
| `@types/pdfkit`             | TypeScript definitions for PDFKit              |
| `axios`                     | Promise-based HTTP client                      |
| `bcryptjs`                  | Library for password hashing                   |
| `cloudinary`                | Cloud storage for image/file uploads           |
| `cookie-parser`             | Parse Cookie header and populate `req.cookies` |
| `cors`                      | Middleware to enable CORS                      |
| `dotenv`                    | Loads environment variables from `.env`        |
| `ejs`                       | Embedded JavaScript templating engine          |
| `express`                   | Web framework for Node.js                      |
| `express-session`           | Middleware for session handling                |
| `http-status-codes`         | Constants for standard HTTP codes              |
| `jsonwebtoken`              | JWT creation and verification                  |
| `mongoose`                  | ODM for MongoDB                                |
| `multer`                    | Middleware for handling multipart/form-data    |
| `multer-storage-cloudinary` | Storage engine for Multer using Cloudinary     |
| `nodemailer`                | Email sending utility                          |
| `passport`                  | Authentication middleware                      |
| `passport-google-oauth20`   | Strategy for Google OAuth 2.0                  |
| `passport-local`            | Strategy for username/password authentication  |
| `pdfkit`                    | PDF generation library                         |
| `redis`                     | In-memory data store for OTP/session/cache     |
| `zod`                       | Schema validation library                      |

---

## 📡 API Endpoints

> For detailed use, see below. All base URLs start with: `/api/v1/`

### 🔐 Auth

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/auth/login`           | Login                     |
| POST   | `/auth/logout`          | Logout                    |
| POST   | `/auth/refresh-token`   | Refresh JWT token         |
| POST   | `/auth/set-password`    | Set/reset password        |
| POST   | `/auth/forgot-password` | Forgot password email     |
| POST   | `/auth/reset-password`  | Reset password with token |

### 📲 OTP

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | `/otp/send`   | Send OTP to email |
| POST   | `/otp/verify` | Verify OTP        |

### 👤 User

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/user/register` | User registration     |
| GET    | `/user/me`       | Get current user info |
| PATCH  | `/user/:id`      | Update user info      |

### 🗺️ Tour

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | `/tour/create-tour-type` | Create new tour type |
| GET    | `/tour/tour-types`       | Get all tour types   |
| PATCH  | `/tour/tour-types/:id`   | Update tour type     |
| GET    | `/tour/tour-types/:id`   | Get tour type by ID  |
| POST   | `/tour/create`           | Create new tour      |
| GET    | `/tour`                  | Get all tours        |
| PATCH  | `/tour/:id`              | Update tour by ID    |
| DELETE | `/tour/:id`              | Delete tour by ID    |

### 📦 Booking

| Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| POST   | `/booking`                   | Create a new booking    |
| GET    | `/booking/my-bookings`       | Get user’s bookings     |
| GET    | `/booking/:bookingId`        | Get specific booking    |
| GET    | `/booking`                   | Admin: Get all bookings |
| PATCH  | `/booking/:bookingId/status` | Update booking status   |

### 💳 Payment

| Method | Endpoint                           | Description          |
| ------ | ---------------------------------- | -------------------- |
| POST   | `/payment/init-payment/:paymentId` | Initialize payment   |
| GET    | `/payment/ipn`                     | Payment verification |
| GET    | `/payment/stats`                   | Payment stats        |

### 📊 Stats

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/stats/booking` | Booking stats |
| GET    | `/stats/payment` | Payment stats |
| GET    | `/stats/user`    | User stats    |
| GET    | `/stats/tour`    | Tour stats    |

---

## ⚙️ Configuration

Create a `.env` file in your project root and use the following structure. Make sure to **replace placeholder values** with your actual configuration.

```env
PORT=your port number
DATABASE_URL=mongodb://localhost:27017
NODE_ENV=development

# BCRYPT
BCRYPT_SALT_ROUND= Give a round

# JWT
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES=your_jwt_access_expires
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES=your_jwt_refresh_expires

# SUPER ADMIN
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=your_strong_password

# GOOGLE AUTHENTICATION
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend.com/api/v1/auth/google/callback

# EXPRESS SESSION
EXPRESS_SESSION_SECRET=your_session_secret

# FRONTEND URL
FRONTEND_URL=http://localhost:5173

# SSLCOMMERZ
SSL_STORE_ID=your_ssl_store_id
SSL_STORE_PASS=your_ssl_store_password
SSL_PAYMENT_API=your_ssl_payment_api
SSL_VALIDATION_API=your_ssl_validation_api
SSL_IPN_URL=https://your-backend.com/api/v1/payment/validate-payment

# SSL Commerz Backend URLs
SSL_SUCCESS_BACKEND_URL=https://your-backend.com/api/v1/payment/success
SSL_FAIL_BACKEND_URL=https://your-backend.com/api/v1/payment/fail
SSL_CANCEL_BACKEND_URL=https://your-backend.com/api/v1/payment/cancel

# SSL Commerz Frontend URLs
SSL_SUCCESS_FRONTEND_URL=http://localhost:5173/payment/success
SSL_FAIL_FRONTEND_URL=http://localhost:5173/payment/fail
SSL_CANCEL_FRONTEND_URL=http://localhost:5173/payment/cancel

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# SMTP (Email)
SMTP_HOST=smtp.example.com
SMTP_PORT=your_smtp_port_number
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_app_password
SMTP_FROM=your_email@example.com

# REDIS
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
```

---

## 📥 Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/khaledsaifulla010/TourSuite-Tour-Management-System-Backend.git
cd TourSuite-Tour-Management-System-Backend
npm install
```
---

<p align="center">
  🛠️ Developed by <strong>Khaled Saifulla</strong> with clean backend architecture ❤️.
</p>

---
