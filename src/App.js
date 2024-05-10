/* Component imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Skill from './components/Skill';

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

/* Firebase imports */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./firebase"; //var to use firebase capacities been authenticated
const auth = getAuth(firebaseApp);

function App() {
  //UseStates vars
  const [user, setUser ] = useState(null);

  //validation of user logged
  useEffect(() => {
    const unsuscribe = onAuthStateChanged ( auth, (user) =>{
      if (user) {
        setUser(user);
        return;
      }

      setUser(null);
    });

    return () => unsuscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user}/>
        <div className="content">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login user={user}/>} />
            <Route path="/profile" element={
              <ProtectedRoute user={user}>
                <Profile user={user}/>
              </ProtectedRoute>
            } />
            <Route path="/skill" element={
              <ProtectedRoute user={user}>
                <Skill user={user}/>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
