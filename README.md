# 🌿 Natura Resort – Booking Web Application

A modern resort booking platform built using the **MERN Stack**, designed to allow users to explore resort services, check availability, view gallery images, and make bookings seamlessly.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

---

## 🚀 Project Overview

**Natura Resort** is a full-stack booking web application developed to demonstrate real-world skills in React, Node.js, Express, and MongoDB. It is designed with a responsive UI and includes core booking system functionalities similar to real resort/room booking websites.

This project was built as part of my web development learning journey and showcases both **frontend** and **backend** skills.

### ✨ Key Highlights
- 🏨 Complete resort booking system
- 🔐 Secure JWT-based authentication
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 📊 Admin dashboard for management

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI Framework |
| **TypeScript** | Type Safety |
| **React Router** | Client-side Routing |
| **Redux Toolkit** | State Management |
| **Tailwind CSS** | Styling |
| **Axios** | HTTP Client |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **Bcrypt** | Password Hashing |
| **Cookie-Parser** | Cookie Management |

---

## ✨ Features

### 👥 User Features
- ✅ Browse resort services (Accommodation, Adventures, Wellness & Spa)
- ✅ View detailed gallery with high-quality images
- ✅ Check real-time availability
- ✅ View comprehensive service/room details
- ✅ Book services or accommodations
- ✅ User registration and login
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ View booking history
- ✅ Special requests during booking

### 🔧 Admin Features
- ✅ Secure admin login
- ✅ **User Management** - View all registered users
- ✅ **Category Management** - Create, edit, delete categories
- ✅ **Offerings Management** - Add, edit, delete services/rooms
- ✅ **Bookings Management** - View all bookings and update status
- ✅ Filter and search functionality

---

## 📁 Project Structure
```
Natura-Resort/
│
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── user/       # User-facing components
│   │   │   └── admin/      # Admin components
│   │   ├── pages/          # Page components
│   │   │   ├── user/       # User pages
│   │   │   └── admin/      # Admin pages
│   │   ├── redux/          # Redux store & slices
│   │   │   ├── slices/     # Redux slices
│   │   │   ├── store.ts    # Store configuration
│   │   │   └── hooks.ts    # Typed hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                 # Express backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── types/          # TypeScript types
│   │   └── server.ts       # Server entry point
│   ├── uploads/            # Uploaded files
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aji1ms/natura-resort.git
cd Natura-Resort
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

### 3️⃣ Setup Frontend
```bash
cd frontend/natura_resort
npm install
```

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get User Details |

### Offerings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/offering` | Get all offerings |
| GET | `/api/auth/offering/:id` | Get single offering |
| POST | `/api/admin/offering/add` | Create offering (Admin) |
| POST | `/api/admin/offering/edit/:id` | Update offering (Admin) |
| DELETE | `/api/admin/offering/delete/:id` | Delete offering (Admin) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/category` | Get all categories |
| POST | `/api/admin/category/add` | Create category (Admin) |
| POST | `/api/admin/category/edit/:id` | Update category (Admin) |
| DELETE | `/api/admin/category/delete/:id` | Delete category (Admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/booking/create` | Create booking |
| GET | `/api/auth/booking` | Get user bookings |
| GET | `/api/admin/booking` | Get all bookings (Admin) |
| PUT | `/api/admin/booking/edit/:id` | Update booking status (Admin) |

### Users (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |

---

### User Interface

#### Home Page
![Home Page](./screenshots/home.png)
*Hero section with stunning resort visuals*

#### Services Page
![Services](./screenshots/services.png)
*Detailed service offerings*

#### Availability Page
![Availability](./screenshots/availability.png)
*Browse and filter available services*

#### Gallery Page
![Gallery](./screenshots/gallery.png)
*High-quality resort images*

### Admin Dashboard

#### Bookings Management
![Admin Bookings](./screenshots/admin-bookings.png)
*Manage all bookings with status updates*

#### Offerings Management
![Admin Offerings](./screenshots/admin-offerings.png)
*Add, edit, and delete offerings*

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  password: String (required, min: 6),
  isAdmin: Boolean (default: false),
  timestamps: true
}
```

### Category Schema
```javascript
{
  name: String (required, unique),
  description: String,
  timestamps: true
}
```

### Offering Schema
```javascript
{
  name: String (required),
  category: ObjectId (ref: Category),
  description: String (required),
  amenities: [String],
  image: String (required),
  price: Number (required, min: 0),
  timestamps: true
}
```

### Booking Schema
```javascript
{
  userId: ObjectId (ref: User, optional),
  offeringId: ObjectId (ref: Offering),
  name: String (required),
  email: String (required),
  phone: String (required),
  guests: Number (required, min: 1),
  checkIn: Date (required),
  checkOut: Date (required),
  specialRequest: String,
  status: Enum ['pending', 'confirmed', 'cancelled'],
  timestamps: true
}
```

---

## 🎯 What This Project Demonstrates

- ✅ **Full-stack MERN application** development from scratch
- ✅ **RESTful API design** with proper routing structure
- ✅ **Database modeling** for complex booking systems
- ✅ **State management** using Redux Toolkit
- ✅ **Authentication & Authorization** using JWT and cookies
- ✅ **TypeScript** implementation for type safety
- ✅ **Responsive UI design** with Tailwind CSS
- ✅ **Component reusability** and clean code practices
- ✅ **Error handling** and validation
- ✅ **Admin dashboard** with CRUD operations

---

## 🚀 Deployment

### Frontend (Vercel)

### Backend (Render/Railway)

```

### Environment Variables for Production
Update `.env` files with production URLs and credentials.

---

## 🌐 Live Demo

**🔗 Frontend:** [https://natura-resort.vercel.app](https://natura-resort.vercel.app)  
**🔗 Backend API:** [https://natura-resort.onrender.com](https://natura-resort.onrender.com)

### Demo Credentials

**Admin Account:**
- Email: `ajmal@gmail.com`
- Password: `ajmal@123`

---

## 👨‍💻 Author

**Ajims Ismail**  
Full Stack Developer

📍 Ernakulam, Kerala, India  
📧 Email: aji1ms.dev@gmail.com  
🔗 GitHub: [@aji1ms](https://github.com/aji1ms)  
💼 LinkedIn: [Ajims Ismail](https://www.linkedin.com/in/ajims-ismail)  
🌐 Portfolio: [ajims.dev](https://ajims.info)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Ajims Ismail](https://github.com/aji1ms)

</div>
