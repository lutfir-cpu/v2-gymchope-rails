import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Login from './components/auth_components/Login';
import Signup from './components/auth_components/Signup';
import Home from "./components/home_components/Home";
import Testing from "./components/home_components/testing_page/Testing";
import PrivateRoutes from "./components/auth_components/PrivateRoutes";
import BookingAvailabilities from "./components/home_components/booking_page/BookingAvaliabilities";
import DaySlots from "./components/home_components/booking_page/DaySlots";
import FeedbackFrom from "./components/home_components/feedback_components/FeedbackForm";

import './App.css';

function App() {

  const [loggedInStatus, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  function checkLoginStatus() {
    const fetchLoginStatus = () => {
      axios
      .get("http://localhost:3000/logged_in", {withCredentials: true})
      .then(res => {
        console.log('Login status checked...');
        console.log(res);

        if (res.data.logged_in && (loggedInStatus == "NOT_LOGGED_IN" || loggedInStatus == null)) {
          console.log("changed status to logged_in");
          setLoggedIn("LOGGED_IN");
          setUser(res.data.user);
        } else if (!res.data.logged_in && (loggedInStatus == "LOGGED_IN" || loggedInStatus == null)){
          console.log("changed status to logged_out");
          setLoggedIn("NOT_LOGGED_IN");
          setUser(null);
        }
      })
      .catch(e => {
        console.log("check login error", e)
      });
    }

  setTimeout(fetchLoginStatus, 1000);
  }

  console.log(loggedInStatus);

  return (
    <Router>
      <div className="app">
        <h1>GymChope</h1>
        <Routes>
          <Route path="/" element={
            <Login/>
          } />

          <Route path="/signup" element={
            <Signup/>
          } />

          <Route path="/homepage" element={
            <Home 
              status={loggedInStatus}
              checkStatus={checkLoginStatus} 
              user={user}
            />
          } />

          <Route path="testing" element={
            <PrivateRoutes 
              checkStatus={checkLoginStatus} 
              status={loggedInStatus}>
              <Testing/>
            </PrivateRoutes>
          } />

          <Route path="booking" element={
              <BookingAvailabilities/>
          } />

          <Route path="/dayslots/:dayName" element={
              <DaySlots/>
          } />

          <Route path="/feedback-report" element={
              <FeedbackFrom />
          } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
