# Basic Blog React MUI Firebase

This is the frontend repository for the **React-Firebase SPA** project, a Single Page Application (SPA) built with **React** and **Firebase**. It includes user authentication with **Firebase Auth** and a simple user profile page.

The project demonstrates deploying a React app to **Firebase Hosting** and styling the interface using a **Material design (MUI)**

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [License](#license)

## Demo

Check out the live demo deployed with free hosting of firebase [here](https://ricardoherrera-softtek-385a9.web.app/login).

## Features

- **Login Page** (`/login`) with Firebase Authentication (email and password).
- **Profile Page** (`/profile`) displaying:
  - User's name.
  - Email.
  - Skills adition.
  - Skills saved.
- **Responsive Design** using a Design System (e.g., Material UI).
- Use of Firestore DB to save information about skills added by each user.
- Deployed on **Firebase Hosting**.

## Technologies

- **React** - Frontend library for building user interfaces.
- **Firebase** - Backend as a service for Authentication and Hosting.
- **Design System** - Material UI (MUI)
- **Vite** - Build tool for faster development.

## Folder Structure

```bash
BasicBlogReactMUIFirebase/
├── public/           # Public files
├── src/
│   ├── components/   # Reusable components (e.g., Navbar, Skills, ListSkills)
│       ├── Login.js             # Login component
│       ├── Home.js              # Home component
│       ├── Navbar.js            # Navbar component
│       ├── NotFound.js          # NotFound component
│       ├── Profile.js           # Profile component
│       ├── ProtectedRoute.js    # ProtectedRoute component
│       ├── Skill.js             # Skill component
│       └── ListSkills.js        # ListSkills component
│── App.js        # Main App component
│── index.js      # Entry point
├── .env              # Environment variables
└── package.json      # Project metadata and scripts
```

## Available scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode. Open http://localhost:5173 to view it in your browser.
The page will reload if you make edits. You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the build folder. It bundles React in production mode and optimizes the build for the best performance.

`npm run test`

Launches the test runner in the interactive watch mode. Additional configuration may be added for testing.

`npm run eject`

Note: this is a one-way operation. Once you eject, you can’t go back!
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc.) directly into your project so you have full control over them.

## License

This project is licensed under the MIT License.
