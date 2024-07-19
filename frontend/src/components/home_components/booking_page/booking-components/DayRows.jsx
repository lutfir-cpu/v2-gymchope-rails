import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./DayRow.css";

const DayRow = ({ day, slots }) => {
    const navigate = useNavigate();
    const [slotArr, setSlotArr] = useState([]);

    function handleNavigateDaySlots() {
        navigate(`/dayslots/${day}`);
    }

    useEffect(() => {
        setSlotArr(slots);
    });
    
    return (
        <div className="day-row">
            <h3>{day}</h3>
            <ul>
                {slotArr.map((slot, index) => (
                    <ul key={index}>
                        {slot.start_time} : {slot.number_of_users} / 6
                    </ul>
                ))}
            </ul>
            <div className="buttons">
                <button onClick={handleNavigateDaySlots}>Select Day</button>
            </div>
        </div>
    );
  };
  
  export default DayRow;