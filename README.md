

## Backend (`/server`) README

# Cravory Backend

An e-commerce backend API built with Node.js, TypeScript, Express, and MongoDB. Features include authentication, image upload, order management, and admin analytics.

<!-- --- -->

<!-- ### 📚 API Documentation

API documentation is available (add link if you have Swagger or similar).

In local development, you can view docs at `/api/v1/docs` (if implemented). -->

---

### 🚀 Features

#### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password handling

#### Product/Menu Management
- CRUD operations for menus/products
- Image upload with Cloudinary
- Restaurant management
- Advanced filtering and search

#### Order System
- Order creation and management
- Order status tracking
- Order cancellation
<!-- - Stock updates on order placement/cancellation -->

#### User Management
- Admin can view all users
- Order history and status tracking

#### Admin Dashboard Analytics
- Sales analytics
- Revenue tracking
- Order status distribution
<!-- - Inventory statistics -->
<!-- - User demographics -->

#### Email & Notifications
- Email verification and password reset via Mailtrap

#### Security Features
- Request validation
- Secure file upload (Multer)
- Protected routes
- Role-based access control
- HTTP-only cookies

---

### 🛠️ Technical Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **File Storage:** Cloudinary
- **File Upload:** Multer
- **Email:** Mailtrap

---

### 📋 Prerequisites

- MongoDB Database
- Cloudinary Account
- Mailtrap Account

---

### 🔧 Environment Variables

Create a `.env` file in the `/server` directory:

```
PORT=8080
MONGODB_URI=your_mongodb_url
CLOUDINARY_CLOUDNAME=your_cloudinary_cloudname
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_pass
FRONTEND_URI=http://localhost:5173
ADMIN_EMAIL=your_admin_email
STRIPE_PUBLISHABLE_KEY=your_stripe_Pk
STRIPE_SECRET_KEY=your_stripe_sk
WEBHOOK_ENDPOINT_SECRET=your_webhook_secret
```

---

### 🚀 Installation & Setup

Clone the repository:

```bash
git clone <your-repo-url>
cd cravory/server
npm install
npm run dev
```

---

### 📦 Project Structure

```
server/
├── controller/      # Route controllers
├── db/              # Database connection
├── mailtrap/        # Email utilities and templates
├── middlewares/     # Custom middlewares
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

---

## Frontend (`/client`) README

# Cravory Frontend

A modern e-commerce frontend built with React, TypeScript, and Vite. Features user authentication, menu browsing, cart, checkout, and admin management.

---

### 🚀 Features

- User authentication (signup, login, email verification, password reset)
- Menu/product browsing with advanced filtering and search
- Cart and checkout flow
- Order history and status tracking
- Admin dashboard for menu and order management
- Responsive design
- Theme support (light/dark mode)

---

### 🛠️ Technical Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **Routing:** React Router
- **Styling:** Tailwind CSS / Custom CSS

---

### 📋 Prerequisites

- Node.js (v16+ recommended)
- Backend API running (see backend setup)

---

### 🔧 Environment Variables

Create a `.env` file in the `/client` directory (if needed):

```
VITE_API_URL=http://localhost:8080/api/v1
```

---

### 🚀 Installation & Setup

```bash
cd cravory/client
npm install
npm run dev
```

---

### 📦 Project Structure

```
client/
├── public/                # Static assets
├── src/
│   ├── admin/             # Admin pages/components
│   ├── assets/            # Images and icons
│   ├── auth/              # Auth pages (login, signup, etc.)
│   ├── components/        # Reusable UI components
│   ├── layout/            # Layout components
│   ├── lib/               # Utility functions
│   ├── routes/            # App routing
│   ├── schema/            # Validation schemas
│   ├── store/             # Zustand stores
│   ├── types/             # TypeScript types/interfaces
│   └── App.tsx           
│   └── main.tsx           # App entry point
├── index.html
└── package.json
```


---
