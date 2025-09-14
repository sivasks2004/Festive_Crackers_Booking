# 🎆 Festive Crackers Booking (FBS)

Festive Crackers Booking (FBS) is a full-stack **e-commerce web application** built using **React JS and Firebase**.  
It provides a smooth and user-friendly platform for customers to browse, select, and purchase festive crackers online.  
The system is modular, responsive, and ensures secure data handling with Firebase Authentication and Firestore Database.  

---

## ✨ Features

- **User Authentication**
  - Login & Registration system using **Firebase Authentication**
  - Secure password management and real-time validation

- **Product Management**
  - Products stored and retrieved dynamically from **Firebase Firestore**
  - Each product includes images, descriptions, and pricing
  - Real-time product updates without page reload

- **Shopping Cart**
  - Add/remove/update products in the cart
  - Auto-calculates total price dynamically

- **User Interaction Modules**
  - Home, Login, Register, Product, Add to Cart, Feedback, and Contact
  - Clean navigation and responsive interface

- **Feedback System**
  - Collects user feedback and stores it in Firestore

- **Responsive UI**
  - Works seamlessly across desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React JS** – Component-based UI design
- **HTML5, CSS3, JavaScript** – Core web technologies
- **Firebase Hosting** – To deploy and host the application

### Backend & Database
- **Firebase Authentication** – User login, signup, and session management
- **Firebase Firestore** – NoSQL cloud database to store products, users, carts, and feedback
- **Firebase Storage** – For storing cracker images

### Additional
- **Front-end Validation** – Real-time validation with JavaScript
- **Cloud-based Database** – Ensures real-time synchronization across users

---

## 📂 Project Modules

- **Home Page:** Showcases featured crackers with festive banners  
- **Login & Register:** Firebase Authentication for secure login/registration  
- **Product Page:** Displays all cracker products from Firestore  
- **Add to Cart:** Allows users to add products, adjust quantities, and view totals  
- **Feedback:** Stores user feedback in Firestore for review  
- **Contact:** Provides details for user queries and support  

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/festive-crackers-booking.git
   cd festive-crackers-booking
2. **Install dependencies**
   ```bash
   npm install
3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new Firebase project
   - Enable **Authentication** (Email/Password method)
   - Create a **Firestore Database**
   - Enable **Firebase Storage** for cracker images (optional)
   - Add your Firebase config in a `.env` file:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```
