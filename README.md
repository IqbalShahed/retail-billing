# 📦 JustBilling - Backend

This is the **Spring Boot Backend** of **JustBilling**, a modern billing and invoicing web application.  
It provides secure REST APIs for authentication, role-based authorization, invoice management, and other billing operations.

## 🚀 Tech Stack
- **Java 21**
- **Spring Boot 3.x**
- **Spring Security + JWT**
- **Spring Data JPA (Hibernate)**
- **MySQL 8.x** (Hosted on Railway)
- **Cloudinary**
- **Maven**

## 🌍 Live Deployment
| Component   | URL |
|-------------|-----|
| **Backend API** | [https://justbilling-backend.onrender.com/api/v1](https://justbilling-backend.onrender.com/api/v1) |
| **Frontend** | [https://justbilling.onrender.com](https://justbilling.onrender.com) |

## 📁 Project Structure
```
backend/
├── src/
│   ├── main/java/com/justbilling
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── security/
│   └── resources/application.properties
└── pom.xml
```

## 🔑 Features
✅ JWT Authentication & Role-Based Authorization  
✅ CRUD for Users, Customers, Items  
✅ Secure REST API + CORS  
✅ Cloudinary Integration  
✅ Deployed on Render  

## ⚙️ Environment Variables
```
SPRING_DATASOURCE_URL=mysql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>
SPRING_DATASOURCE_USERNAME=<USERNAME>
SPRING_DATASOURCE_PASSWORD=<PASSWORD>
SPRING_JPA_SHOW_SQL=true
SPRING_JPA_DDL_AUTO=update
CLOUDINARY_CLOUD_NAME=<YOUR_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_KEY>
CLOUDINARY_API_SECRET=<YOUR_SECRET>
JWT_SECRET_KEY=MySuperSecretKey12345678901234567890
PORT=8080
```

## ▶️ Run Locally
```bash
git clone https://github.com/IqbalShahed/retail-billing.git
cd billingsoftware
./mvnw spring-boot:run
```

Backend runs at http://localhost:8080/api/v1

## 🔒 API Security
All endpoints except `/auth/**` require JWT in `Authorization` header.

# 🎨 JustBilling - Frontend

This is the **React + Vite Frontend** of **JustBilling**, a modern billing and invoicing application.

## 🚀 Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router v7
- Axios
- React Toastify
- Deployed on Render

## 🌍 Live Deployment
Frontend: [https://justbilling.onrender.com](https://justbilling.onrender.com)

## 📁 Project Structure
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🔑 Features
✅ JWT Authentication & Protected Routes  
✅ Role-Based UI Access  
✅ Invoice & Customer Management  
✅ Toast Notifications  
✅ Responsive UI

## ⚙️ Environment Variables
```
VITE_BACKEND_URL=https://justbilling-backend.onrender.com/api/v1
```

## ▶️ Run Locally
```bash
git clone https://github.com/IqbalShahed/retail-billing.git
cd client
npm install
npm run dev
```

Frontend runs at http://localhost:5173

## 📌 License
MIT License

