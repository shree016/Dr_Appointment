# 🏥 Doctor Appointment Booking System

A full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows patients to book appointments with doctors based on availability, specialization. 
It includes secure authentication, real-time slot checking, and role-based dashboards for Patients, Doctors, and Admins.

---

## 🔗 Live Demo

> 🚀 https://drappointment-production-adca.up.railway.app/

---

## 📌 Features

- 👤 **Patient Dashboard**: Register, log in, browse doctors, book and cancel appointments.
- 🩺 **Doctor Dashboard**:  view and manage appointment requests.
- 🛡️ **Admin Panel**: Approve doctors, manage users, and monitor system activity.
- 🔒 **JWT Authentication**: Secure login system with role-based access control.
- 🌐 **Responsive UI**: Built with React.js and Tailwind CSS for mobile and desktop.
- ☁️ **Image Uploads**: Integrated with Cloudinary for doctor profile pictures.
- 📬 **Contact/Feedback Forms**: Handled via Formspree (no backend required).
- 🚀**Hosting**:  Fully Deployed on Railway (Full-stack: Backend + Frontend in one service)

---

## 🛠️ Tech Stack

| Tech           | Description                                |
|----------------|--------------------------------------------|
| React.js       | Frontend framework                         |
| Tailwind CSS   | Styling & responsive UI                    |
| Redux Toolkit  | State management                           |
| Node.js        | Backend JavaScript runtime                 |
| Express.js     | Backend framework                          |
| MongoDB        | NoSQL database                             |
| JWT            | Token-based authentication                 |
| Cloudinary     | Image upload & hosting                     |
| Formspree      | Contact form handling                      |

---


## 🚀 How to Run Locally



### 🖥️ Backend Setup

```bash
# Step 1: Navigate to the backend folder
cd dr_appointment

# Step 2: Install dependencies
npm install

# Step 3: Create a .env file in the root of the backend folder and add the following:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

# Step 4: Start the backend server
npm start
```

---

### 🌐 Frontend Setup

```bash
# Step 1: Navigate to the frontend folder
cd client

# Step 2: Install dependencies
npm install

# Step 3: Create a .env file in the root of the client folder and add the following:
REACT_APP_SERVER_DOMAIN=http://localhost:your_backend_port/api
REACT_APP_CLOUDINARY_BASE_URL=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_PRESET=your_unsigned_upload_preset

# Step 4: Start the frontend React app
npm start
```

---

## 👩‍💻 Author

**Shrilaxmi Heralagi**  
🔗 [Connect with me on LinkedIn](https://www.linkedin.com/in/shree016/)











