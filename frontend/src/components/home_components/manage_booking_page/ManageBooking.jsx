import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ManageBookings = () => {
    const navigate = useNavigate();
    const [bookingsArr, setBookingsArr] = useState([]);

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        axios
        .get('http://localhost:3000/get_bookings_from_user', {withCredentials: true})
        .then(response => {
            console.log("Obtaining Bookings...", response)
            if (response.data.logged_in) {
                setBookingsArr(response.data.bookings)
                console.log(bookingsArr)
            } else if (response.data.logged_in == false) {
                alert('You are currently not logged in. Please login to continue.')
                navigate('/');
            } else {
                console.log("Unknown Outcome from axios get_bookings_from_user")
            }
        })
        .catch(error => {
            console.log("Error obtaining bookings", error)
        })
    };



    return (
        <div className="manage-bookings-container">
            <h2>Manage Your Bookings</h2>
            <ul>
                {bookingsArr.map((booking, index) => (
                    <ul key={index} className="manage-bookings-item">
                        <div>
                            Day: {booking.slot.day_slot.day} | Start Time: {booking.slot.start_time}
                            <button onClick={() => handleDeleteBooking(booking)}>Delete Booking</button>
                        </div>
                    </ul>
                ))}
            </ul>
            <div className="buttons">
                <button onClick={() => navigate('/homepage')}>Back to Homepage</button>
            </div>
        </div>
    )
}

export default ManageBookings;