/* Component imports */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

/* Firebase imports */
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

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
                <Profile/>
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
