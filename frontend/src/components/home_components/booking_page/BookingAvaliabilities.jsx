import "./BookingAvailabilities.css";
import DayRow from "./booking-components/DayRows";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const BookingAvailabilities = () => {
    const navigate = useNavigate();
    const [dayRowsArr, setDayRowsArr] = useState([]);

    function handleNavigateHome() {
        navigate('/homepage');
    }

    useEffect( () => {
        //Obtaining dayRowsArr
        axios
            .get("http://localhost:3000/dayslots", { withCredentials: true })
            .then(response => {
                console.log("Obtaining dayslots...", response)
                setDayRowsArr(response.data)
            })
            .catch(e => {
                console.log("Error Obtaining Slots", e)
            });
    }, []);

    return (
        <div className="grid">
            <div className="main">
                <div className="flex-container">
                    {dayRowsArr.map((daySlot, index) => (
                        <DayRow key={index} day={daySlot.day} slots={daySlot.slots}/>
                    ))}
                </div>
                <div className="buttons">
                    <button onClick={handleNavigateHome}>Back To Homepage</button>
                </div>
            </div>
        </div>
    );
}

export default BookingAvailabilities;