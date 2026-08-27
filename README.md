# 🏟️ VenueX – Sports Facility Booking Platform

## 📌 Project Purpose
VenueX is a full‑stack booking system where users can discover sports facilities (football turfs, badminton courts, swimming lanes, tennis courts, etc.) and book them for specific dates and time slots. Authenticated users can also add and manage their own facilities, view their bookings, and cancel them – all in one place.

---

## 🌐 Live URL
[https://venuex-sports.vercel.app/](https://venuex-sports.vercel.app/)

---

## ✨ Key Features
- 🔐 **Authentication** – Login/Register with email/password and Google OAuth (secured with Better Auth and HTTP‑only cookies)
- 🏸 **Facility CRUD** – Add, view, update, and delete facilities (only owners can manage their own)
- 📅 **Booking System** – Book a facility, see total price, view all personal bookings, and cancel pending bookings
- 🔍 **Search & Filter** – Search by facility name (regex) and filter by sport type
- 📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop
- 🧩 **Extra Sections** – Custom hero banner, featured facilities (6+ cards from DB), and two creative static sections
- ⚡ **Private Routes** – Protected pages with redirect for unauthenticated users
- 🛠️ **User-Friendly UI** – Clean, modern design with DaisyUI components and Tailwind CSS

---

## 📦 NPM Packages Used

### Dependencies
- `@better-auth/mongo-adapter` – MongoDB adapter for Better Auth  
- `@heroui/react` – UI component library  
- `better-auth` – Authentication library (with cookie support)  
- `daisyui` – Tailwind CSS component library  
- `mongodb` – MongoDB Node.js driver  
- `next` – React framework (version 16)  
- `react`, `react-dom` – Core React libraries  
- `react-hot-toast` – Toast notifications  
- `react-icons` – Icon set  
- `sweetalert2` – Custom alerts and confirm dialogs  

### Dev Dependencies
- `@gravity-ui/icons` – Additional icons  
- `@tailwindcss/postcss` – Tailwind CSS PostCSS plugin   
- `tailwindcss` – Utility-first CSS framework  

---

## 🛠️ Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, DaisyUI, HeroUI  
- **Backend**: Next.js API routes (or Node.js + Express) with Better Auth  
- **Database**: MongoDB (with `mongodb` driver and adapter)  
- **Deployment**: Vercel (frontend & backend)  