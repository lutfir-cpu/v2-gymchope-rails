import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import './Home.css';

const HomePage = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.checkStatus();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        axios
            .delete("http://localhost:3000/logout", { withCredentials: true })
            .then(response => {
                console.log("logging out", response);
                navigate("/");
            })
            .catch(error => {
                console.log("reg error: ", error)
                setLogIn(true);
            });
        
        props.checkStatus();
    }

    return (
        <div className="dashboard-container">
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
            <section>
                <div>
                    <p>Status: {props.status}</p>
                    {props.user != null && <h2>Welcome, {props.user.first_name}!</h2>}
                </div>
            </section>
            <section className="features-section">
                <Link to="/booking" className="feature">
                    <p>Booking</p>
                    <span>Book a gym slot</span>
                </Link>
                <Link to="/manage_bookings" className="feature">
                    <p>Manage Bookings</p>
                    <span>View and cancel gym slots</span>
                </Link>
                <Link to="/feedback_report" className="feature">
                    <p>Feedback/Report</p>
                    <span>Report faulty equipment / issues</span>
                </Link>
                <Link to="/history" className="feature">
                    <p>History</p>
                    <span>Check your gym sessions and booking history</span>
                </Link>
                <Link to="/collect_return_card" className="feature">
                    <p>Collect/Return Card</p>
                    <span>Indicate your collection/return of gym card</span>
                </Link>
                <Link to="/testing" className="feature">
                    <p>Testing</p>
                    <span>Extra Page for dummy testing and functionality</span>
                </Link>
            </section>
            <div className="logout-section">
                <button
                    className="buttons"
                    value="Log Out"
                    onClick={handleClick}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default HomePage;