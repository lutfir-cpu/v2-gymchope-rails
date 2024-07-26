import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import './Home.css';

const HomePage = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [notificationsArr, setNotificationsArr] = useState([]);

    useEffect(() => {
        props.checkStatus();
        obtainUserData();
    }, []);

    const obtainUserData = () => { 
        axios.get('http://localhost:3000/logged_in', {withCredentials: true} )
            .then(response => {
                console.log('Obtaining User', response)
                if (response.data.logged_in) {
                    setUser(response.data.user);
                    getNotifications(response.data.user);
                } else if (response.data.logged_in == false) {
                    alert('You are currently not logged in. Please login to continue.')
                } else {
                    console.log("Unknown Outcome from axios logged_in")
                }
            })
            .catch(error => {
                console.log("Error Obtaining User Data", error)
            })
    }

    const getNotifications = (user) => {
        axios
        .post('http://localhost:3000/get_histories_by_user', {user})
        .then(response => {
            console.log("Obtaining Notifications ...", response)
            const tempArr = response.data.length > 3 ? [...response.data].slice(0,3) : [...response.data]
            setNotificationsArr(tempArr)
            console.log(tempArr)
        })
        .catch(error => {
            console.log("Error obtaining logs", error)
        })
    };

    const handleClick = (e) => {
        e.preventDefault();
        deleteSession();
    }

    const deleteSession = () => {
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
                        {notificationsArr.map((notification, index) => (
                            <tr key={index} className="log-item">
                                <td>
                                Time: {notification.created_at} | {notification.log_message}
                                </td>
                            </tr>
                        ))}
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
                <Link to="/collect_card" className="feature">
                    <p>Collect/Return Card</p>
                    <span>Indicate your collection/return of gym card</span>
                </Link>
                <Link to="/testing" className="feature">
                    <p>Credits</p>
                    <span>Acknowledgements and credits</span>
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