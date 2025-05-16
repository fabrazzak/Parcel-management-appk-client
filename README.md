# 📦 Parcel Management System

![Project Banner](https://via.placeholder.com/1200x600?text=Parcel+Management+System) 
*(Replace with your actual banner image URL)*

## 🚀 Overview
A full-stack MERN application for managing parcel deliveries with role-based access control (Admin, Delivery Personnel, and Users). Features include parcel booking, delivery tracking, payment processing, and analytics.

## ✨ Features

### 🔐 Authentication
- User registration/login (Email/Password & Social Auth via Firebase)
- JWT protected routes
- Role-based access control

### 📊 Dashboards
- **Admin**: Analytics, user management, delivery assignment
- **Delivery Personnel**: Task management, status updates
- **User**: Parcel booking, tracking, payments

### 💼 Core Functionality
- Parcel booking with auto-pricing
- Stripe payment integration
- Real-time status tracking
- Review system for delivery personnel
- Interactive maps for delivery routes

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS + DaisyUI
- React Hook Form
- Tanstack Query
- ApexCharts

### Backend
- Node.js + Express
- MongoDB (Atlas)
- Mongoose ODM

### Services
- Firebase Authentication
- Stripe Payment Gateway
- Cloudinary (Image storage)

## 🌐 Live Demo

🔗 [https://parcel-management-app-d81f7.web.app](https://parcel-management-app-d81f7.web.app)

**Demo Credentials:**
- Admin: `admin@gmail.com` / `Admin11`
- Delivery: `delivery-man@gmail.com` / `delivery-man11`

## 🚀 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Firebase project
- Stripe account

### Setup
1. Clone repositories:
   ```bash
   git clone https://github.com/yourusername/parcel-management-client.git
   git clone https://github.com/yourusername/parcel-management-server.git
