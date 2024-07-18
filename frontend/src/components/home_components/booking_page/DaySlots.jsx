import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './DaySlots.css'; // Import the CSS file
import axios from "axios";

const DaySlots = () => {
    const [slotArr, setSlotArr] = useState([]);
    const { dayName } = useParams();
    const navigate = useNavigate();

    //insert API call for dayrows
    const [bookingData, setBookingData] = useState({
        user_id:12,
        slot_id:22
    })
    
    const handleBookSession = () => {
        axios.post('http://localhost:3000/bookings', {booking: bookingData})
            .then(response => {
                alert('Booking Successful')
                console.log(response.data)
            })
            .catch(error => {
                alert('Booking Unsuccessful')
                console.log("Error", error)
            })

    }

    //KIV ThIS FIRST
    /*const selectSlot = (slotID) => {
        setBookingData(prev => ({ ...prev, slot_id: slotID}))
    }*/
    //end

    useEffect(() => {
        // Simulate an API call
        const fetchSlots = async () => {
            const slots = [
                { name: 'Event 1', slotStart: '09:00', paxPerSlot: 3 },
                { name: 'Event 2', slotStart: '11:00', paxPerSlot: 4 },
                { name: 'Event 3', slotStart: '12:00', paxPerSlot: 0 }
            ];
            setSlotArr(slots);
        };

        fetchSlots();
    }, []);

    return (
        <div className="day-slots-container">
            <h2>{dayName}</h2>
            <ul>
                {slotArr.map((slot, index) => (
                    <ul key={index} className="day-slot-item">
                        <div>
                            Start: {slot.slotStart} | Users: {slot.paxPerSlot}
                            <button onClick={handleBookSession}>Select Slot</button>
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