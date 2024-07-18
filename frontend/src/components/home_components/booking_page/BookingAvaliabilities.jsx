import "./BookingAvailabilities.css";
import DayRow from "./booking-components/DayRows";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'



const BookingAvailabilities = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate an API call
        const fetchDayRows = async () => {
            const data = [
                { day: 'Monday', slots: ['Event 1', 'Event 2'] },
                { day: 'Tuesday', slots: ['Event 3', 'Event 4'] },
                { day: 'Wednesday', slots: ['Event 5', 'Event 6'] },
                { day: 'Thursday', slots: ['Event 7', 'Event 8'] },
                { day: 'Friday', slots: ['Event 9', 'Event 10'] },
                { day: 'Saturday', slots: ['Event 11', 'Event 12'] },
                { day: 'Sunday', slots: ['Event 13', 'Event 14'] }
            ];
            setDayRowsArr(data);
        };

        fetchDayRows();
    }, []);
    
    const [dayRowsArr, setDayRowsArr] = useState([]);

    function handleNavigateHome() {
        navigate('/homepage');
    }

    return (
        <div className="grid">
            <div className="main">
                <div className="flex-container">
                    {dayRowsArr.map((daySlot, index) => (
                        <DayRow key={index} day={daySlot.day}/>
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