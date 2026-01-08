# 🐾 PawMart - Pet Adoption & Supply Portal (Client Side)

PawMart is a comprehensive, community-driven platform designed to connect pet owners, adopters, and suppliers. It facilitates seamless pet adoption and provides a robust marketplace for pet food, accessories, and care products.

## 🚀 Live Links

- **Frontend Live:** [https://pawmart-frontend.vercel.app](https://pawmart-frontend.vercel.app)
- **Backend Live:** [https://pawmart-backend-beta.vercel.app](https://pawmart-backend-beta.vercel.app)

## 🔑 Demo Credentials

To test the User and Admin dashboards, you can use these credentials:

**👤 Regular User:**

- **Email:** `user@pawmart.com`
- **Password:** `User123`

**👑 Admin User:**

- **Email:** `admin@pawmart.com`
- **Password:** `Admin123`

## ✨ Key Features

- **Authentication System:** Secure Email/Password registration and Google Social Login via Firebase.
- **Role-Based Access Control:** Distinct dashboards and permissions for Users and Admins.
- **Advanced Dashboard:**
  - **Admin:** Manage all users, listings, and orders; view analytics with charts.
  - **User:** Manage personal listings, adoption requests, and purchase history.
- **Search, Filter & Sort:**
  - Real-time search by name.
  - Filter by category (Pets, Food, Accessories, etc.).
  - Sort by Price (High/Low) and Name.
- **Adoption & Order System:** Integrated workflow for adopting pets or buying products.
- **PDF Report Generation:** Users can download their order/adoption history as a formatted PDF.
- **Premium UI/UX:**
  - **Smooth Scrolling:** Implemented using `Lenis` for a luxurious feel.
  - **Dark/Light Mode:** Fully supported theme toggle.
  - **Animations:** Engaging micro-interactions and transitions.
  - **Responsive:** Fully optimized for Mobile, Tablet, and Desktop.
- **Pagination:** Client-side pagination for smooth browsing of large datasets.

## 🛠️ Technologies Used

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS, DaisyUI
- **Routing:** React Router DOM
- **Authentication:** Firebase Auth
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Data Visualization:** Recharts
- **HTTP Client:** Axios / Fetch
- **Utilities:** Lenis (Scroll), jsPDF (Reports), React Hot Toast (Notifications)

## 📦 NPM Packages Used

| Package                        | Usage                                 |
| :----------------------------- | :------------------------------------ |
| `firebase`                     | Authentication & Backend integration  |
| `react-router-dom`             | Single Page Application routing       |
| `react-hot-toast`              | Modern toast notifications            |
| `recharts`                     | Dashboard analytics charts            |
| `jspdf` & `jspdf-autotable`    | Generating PDF reports for orders     |
| `lenis`                        | Smooth scrolling implementation       |
| `daisyui`                      | Tailwind CSS component library for UI |
| `localforage` / `match-sorter` | Utility helpers                       |

## ⚙️ Installation & Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pawmart-frontend.git
   cd pawmart-frontend
   ```
