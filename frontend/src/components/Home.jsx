import {Link, useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import './Home.css';

const HomePage = (props) => {
    const navigate = useNavigate();

    props.checkStatus();

    const handleClick = (e) => {
        e.preventDefault();

        axios
            .delete("http://localhost:3000/logout", {withCredentials: true})
            .then(response => {
                console.log("logging out", response);
                navigate("/");
            })
            .catch(error => {
                console.log("reg error: ", error)
                setLogIn(true);
            });
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>GymChope</h1>
                <div className="header-icons">
                </div>
            </header>

            <div>
                <p>Status: {props.status}</p>
                {props.user != null && <h2>Welcome, {props.user.first_name}!</h2>}
            </div>

            <div>
                <button
                    value={"Log Out"}
                    onClick={handleClick}
                >Log Out
                </button>
            </div>

            <section className="notifications-section">
                <h2>Notifications</h2>
                <table className="notifications-table">
                    <tbody>
                    <tr>
                        <td>No notifications available.</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            <section className="features-section">
                <Link to="/booking" className="feature">
                    
                    <p>Booking</p>
                    <span>Book a gym slot</span>
                </Link>
                <Link to="/manage-bookings" className="feature">
                    
                    <p>Manage Bookings</p>
                    <span>View and cancel gym slots</span>
                </Link>
                <Link to="/feedback-report" className="feature">
                    
                    <p>Feedback/Report</p>
                    <span>Report faulty equipment / issues</span>
                </Link>
                <Link to="/booking-history" className="feature">
                    
                    <p>Booking History</p>
                    <span>Check your history</span>
                </Link>
                <Link to="/collect-return-card" className="feature">
                    
                    <p>Collect/Return Card</p>
                    <span>Indicate your collection/return of gym card</span>
                </Link>
                <Link to="/testing" className="feature">
                    
                    <p>Testing</p>
                    <span>Extra Page for dummy testing and functionality</span>
                </Link>
            </section>
        </div>
    );
};

export default HomePage;