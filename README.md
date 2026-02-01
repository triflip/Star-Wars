# 🌌 Star Wars Project - IT Academy

This is a React application that consumes the Star Wars API (SWAPI), allowing users to explore the saga's starships, view their details, and manage access through an authentication system.

## 🚀 Demo
You can see the application in action here: [https://triflip.github.io/Star-Wars/]

---

## 🛠️ Technologies Used

- **React** + **Vite** (Frontend)
- **Redux Toolkit** (Global state management)
- **React Router Dom** (Navigation and protected routes)
- **Firebase** (Authentication and persistence)
- **Styled Components** (Styling)
- **Jest** & **React Testing Library** (Test suite)

---

## 🧪 Testing

A testing architecture has been implemented to ensure code stability:

- **Unit Testing**: Custom Hook tests (`useAuthListener`).
- **Component Testing**: Rendering and interaction validation (`StarshipCard`).
- **Integration Testing**: Security flow verification (`ProtectedRoute`).

To run the tests:
```bash
npm  test 

---

## 📦 Local Installation 
1- Clone the repository: git clone https://github.com/usuari/Star-Wars.git 
2-Install the dependencies: npm install 
3-Create a .env file with your Firebase keys. 
4-Run the project: npm run dev