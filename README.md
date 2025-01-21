# Parcel Management System

## Overview
The Parcel Management System is a comprehensive MERN stack application designed to facilitate parcel bookings, delivery management, and user interactions in an efficient and user-friendly manner. This app caters to three distinct user types: **Admin**, **Delivery Men**, and **Users**. It provides features such as parcel booking, user authentication, admin dashboards, delivery management, and much more.

## Key Features
1. **User Authentication**: Users can register and log in using email/password or social login. Firebase handles authentication.
2. **Dynamic Dashboards**: Separate dashboards for Admins, Delivery Men, and Users with tailored menus and features.
3. **Parcel Booking System**: Users can book parcels with detailed information, and the price is auto-calculated based on weight.
4. **Delivery Management**: Admins can assign delivery personnel to parcels and track parcel status.
5. **Statistics Dashboard**: Admins can view detailed statistics and charts powered by React Apex Charts.
6. **Payment System**: Users can pay for parcel bookings using the Stripe payment gateway.
7. **Real-Time Feedback**: Sweet alerts and notifications for all CRUD operations and authentication.
8. **Map Integration**: Delivery Men can view parcel delivery locations on an interactive map.
9. **Review System**: Users can leave reviews for Delivery Men, which are displayed in their dashboard.
10. **Mobile Responsiveness**: The app is fully responsive for mobile, tablet, and desktop views.

## Live Demo
## [https://parcel-management-app-d81f7.web.app/](#)

## Admin Access
- **Email**: `admin@gmail.com`
- **Password**: `Admin11`

## Delivery Men Access
- **Email**: `delivery-man@gmail.com`
- **Password**: `delivery-man11`

## Tech Stack
- **Frontend**: React, Tailwind CSS, DaisyUI, Shadcn
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Payment Integration**: Stripe
- **State Management**: Tanstack Query

## Installation
1. Clone the repositories:
   ```bash
   git clone <client-side-repo-link>
   git clone <server-side-repo-link>
   ```
2. Navigate to the directories:
   ```bash
   cd client
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Client:
     - Create a `.env.local` file in the `client` directory.
     - Add Firebase configuration keys.
   - Server:
     - Create a `.env` file in the `server` directory.
     - Add MongoDB URI and JWT secret.
5. Start the development servers:
   - Client:
     ```bash
     npm start
     ```
   - Server:
     ```bash
     npm run dev
     ```

## Project Structure
### Client-Side Repository
- **Notable Commits**: Minimum 20 commits showcasing feature implementations, bug fixes, and optimizations.
- **Directory Structure**:
  - `src/components`: Reusable components.
  - `src/pages`: Pages for routing.
  - `src/hooks`: Custom hooks.
  - `src/context`: Context providers.

### Server-Side Repository
- **Notable Commits**: Minimum 12 commits showcasing feature implementations, bug fixes, and optimizations.
- **Directory Structure**:
  - `routes`: API endpoints.
  - `models`: MongoDB schemas.
  - `controllers`: Business logic.
  - `middlewares`: Authentication and error handling.

## Features Breakdown
### Homepage
- Animated Navbar with user profile dropdown.
- Banner with a search bar and heading text.
- Features section with icons, titles, and descriptions.
- Statistics and Top Delivery Men sections.

### Dashboards
- **User Dashboard**:
  - Book parcels with validation.
  - View and filter parcels by status.
  - Update or cancel pending parcels.
  - Update profile and upload profile pictures.
- **Admin Dashboard**:
  - View and manage all parcels, users, and delivery personnel.
  - Assign delivery personnel.
  - View statistics with charts.
- **Delivery Men Dashboard**:
  - View assigned deliveries.
  - Update parcel status.
  - View and respond to reviews.

### Bonus Features
- JWT for route protection.
- React Hook Forms for form handling.
- Light and dark theme toggle.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.


---
**Developed with ❤️ by [Abdur Razzak]**
