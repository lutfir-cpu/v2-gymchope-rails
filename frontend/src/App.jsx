import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import { useState } from "react";
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup';
import Home from "./components/Home/Home.jsx";
//import './App.css';
import PrivateRoutes from "./components/PrivateRoutes";
import axios from "axios";

function App() {

  const [loggedInStatus, setLoggedIn] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState(null);

  function checkLoginStatus() {
    axios
      .get("http://localhost:3000/logged_in", {withCredentials: true})
      .then(res => {
        console.log('Login status checked...');
        console.log(res);

        if (res.data.logged_in && loggedInStatus == "NOT_LOGGED_IN") {
          console.log("changed status to logged_in");
          setLoggedIn("LOGGED_IN");
          setUser(res.data.user);
        } else if (!res.data.logged_in && loggedInStatus == "LOGGED_IN"){
          console.log("changed status to logged_out");
          setLoggedIn("NOT_LOGGED_IN");
          setUser(null);
        }
      })
      .catch(e => {
        console.log("check login error", e)
      });
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <Login/>
          } />

          <Route path="/signup" element={
            <Signup/>
          } />

          <Route path="/home-page" element={
            <Home 
              status={loggedInStatus}
              checkStatus={checkLoginStatus} 
              user={user}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
