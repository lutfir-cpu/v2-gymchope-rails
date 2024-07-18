import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./DayRow.css";

const DayRow = ({ day }) => {

    useEffect(() => {
        // Simulate an API call
        const fetchSlots = async () => {
            const slots = [
                { name: 'Event 1', slotStart: '09:00', paxPerSlot: 3 },
                { name: 'Event 2', slotStart: '11:00', paxPerSlot: 4 },
                { name: 'Event 2', slotStart: '12:00', paxPerSlot: 0 }
            ];
            setSlotArr(slots);
        };

        fetchSlots();
    }, []);
    
    const navigate = useNavigate();
    const [slotArr, setSlotArr] = useState([]);

    function handleNavigateDaySlots() {
        navigate(`/dayslots/${day}`);
    }
    
    return (
        <div className="day-row">
            <h3>{day}</h3>
            <ul>
                {slotArr.map((slot, index) => (
                    <ul key={index}>
                        {slot.slotStart} : {slot.paxPerSlot} / 6
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