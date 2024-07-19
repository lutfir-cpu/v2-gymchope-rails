import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './DaySlots.css'; // Import the CSS file
import axios from "axios";

const DaySlots = () => {
    const [slotArr, setSlotArr] = useState([]);
    const { dayName } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getSlots();
        obtainUserData()
    }, []);
    

    //HANDLE ERROR BETTER HERE PLEASE, especially when error comes from backend
    const handleBookSession = (slot) => {
        axios
            .post('http://localhost:3000/bookings', {
                booking: {
                    user_id: user.id,
                    slot_id: slot.id
                } 
            })
            .then(response => {
                alert('Booking Successful')
                console.log(response.data)
                getSlots();
            })
            .catch(error => {
                alert('Booking Unsuccessful')
                console.log("Error", error)
            })
    }

    const getSlots = () => {
        axios
        .post('http://localhost:3000/dayslots/slots_in_day', {day: dayName})
        .then(response => {
            console.log("Obtaining Slots ...", response)
            setSlotArr(response.data)
        })
        .catch(error => {
            console.log("Error obtaining slots", error)
        })
    };

    const obtainUserData = () => { 
        axios.get('http://localhost:3000/logged_in', {withCredentials: true} )
            .then(response => {
                console.log('Obtaining User', response)
                if (response.data.logged_in) {
                    setUser(response.data.user)
                } else if (response.data.logged_in == false) {
                    alert('You are currently not logged in. Please login to continue.')
                    navigate('/');
                } else {
                    console.log("Unknown Outcome from axios logged_in")
                }
            })
            .catch(error => {
                console.log("Error Obtaining User Data", error)
            })
    }

    return (
        <div className="day-slots-container">
            <h2>{dayName}</h2>
            <ul>
                {slotArr.map((slot, index) => (
                    <ul key={index} className="day-slot-item">
                        <div>
                            Start: {slot.start_time} | Users: {slot.number_of_users}
                            <button onClick={() => handleBookSession(slot)}>Select Slot</button>
                        </div>
                    </ul>
                ))}
            </ul>
            <div className="buttons">
                <button onClick={() => navigate('/booking')}>Back to Booking Availabilities</button>
            </div>
        </div>
    );
}

export default DaySlots;