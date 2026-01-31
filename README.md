# 🌌 Star Wars Project — IT Academy

A React application that consumes the **Star Wars API (SWAPI)**, allowing users to explore starships from the saga, view detailed information, and access protected content through a Firebase authentication system.

Live demo:  
👉 (https://triflip.github.io/Star-Wars/)


---

## ✨ Features

- 🔐 **Authentication System** (Login & Register with Firebase)
- 🚀 **Starships Explorer** (List + Detail View)
- 🛰️ **Protected Routes** using React Router
- 📦 **Global State Management** with Redux Toolkit
- 🎨 **Custom UI** inspired by Star Wars (Tailwind + animations)
- ⚡ **Fast Build** with Vite
- 🧪 **Testing Suite** (Unit, Component & Integration)

---

## 🖼️ Screenshots

> *(Add 2–3 images here: Welcome Page, Starships List, Starship Detail)*

---

## 🛠️ Technologies Used

- **React** + **Vite**
- **Redux Toolkit**
- **React Router Dom**
- **Firebase Authentication**
- **Tailwind CSS**
- **Jest** & **React Testing Library**

---

## 🧪 Testing

This project includes a testing architecture to ensure stability:

- **Unit Tests** → Custom hooks (`useAuthListener`)
- **Component Tests** → UI rendering & interactions (`StarshipCard`)
- **Integration Tests** → Authentication flow (`ProtectedRoute`)

Run tests:

```bash
npm test
📦 Local Installation
bash
# 1. Clone the repository
git clone https://github.com/triflip/Star-Wars.git

# 2. Install dependencies
npm install

# 3. Create a .env file with your Firebase keys
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
...

# 4. Run the project
npm run dev
🚀 Deployment
This project is deployed using GitHub Pages through Vite’s configuration.

👨‍💻 Author
Project developed by Toni as part of the IT Academy program.
Passionate about clean UI, animations, and building smooth user experiences.