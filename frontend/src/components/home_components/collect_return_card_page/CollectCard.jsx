import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './CollectCard.css'

const CollectCard = () => {
    const navigate = useNavigate();
    const [bookingsArr, setBookingsArr] = useState([]);
    const [gymCardsArr, setGymCardsArr] = useState([]);
    const [gymCard, setGymCard] = useState(null);

    useEffect(() => {
        checkOngoingSession()
        getBookings();
        getGymCards();
    }, []);

    const checkOngoingSession = () => {
        axios
            .get('http://localhost:3000/ongoing_gym_session', {withCredentials: true})
            .then(response => {
                console.log("Obtaining Ongoing Gym Sessions", response)
                if (response.data) {
                    navigate('/return_card');
                } else if (response.data == null) {
                } else {
                    console.log("Unknown Outcome from axios get_ongoing_sessions")
                }
            })
            .catch(error => {
                console.log("Error obtaining gym sessions", error)
            })
    }

    const getBookings = () => {
        axios
            .get('http://localhost:3000/get_bookings_from_user', {withCredentials: true})
            .then(response => {
                console.log("Obtaining Bookings...", response)
                if (response.data.logged_in) {
                    setBookingsArr(response.data.bookings)
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

    const getGymCards = () => {
        axios
            .get('http://localhost:3000/gym_cards', {withCredentials: true})
            .then(response => {
                console.log("Obtaining GymCards...", response)
                setGymCardsArr(response.data)
                if (response.data != 0) {
                    setGymCard(response.data[0]);
                }
            })
            .catch(error => {
                console.log("Error obtaining GymCards", error)
            })
    };


    const handleSubmit = (booking) => {
        axios
            .post('http://localhost:3000/gym_sessions', {
                booking: booking,
                gym_card: gymCard
            })
            .then(response => {
                console.log("Creating Gym Session...", response)
                if (response.data.gym_session_created) {
                    alert('Card Collect Successful')
                    checkOngoingSession();
                } else {
                    alert('Card Collect Unsuccessful')
                }
            })
            .catch(error => {
                alert('Card Collect Unsuccessful')
                console.log("Error", error)
            })
    }

    const handleChange = (e) => {
        const selectedCard = gymCardsArr.find(card => card.name === e.target.value);
        setGymCard(selectedCard);
        console.log('changed')
    };


    return (
        <div className="collect-card-container">
            <h2>Collect Card</h2>
            <div>
                <label>Please select the card you are collecting: </label>
                <select name="GymCard" id="GymCards" defaultValue={gymCardsArr != 0 ? gymCardsArr[0].name : ""} onChange={handleChange}>
                    {gymCardsArr.length == 0 
                        ? <option value={""} key={-1}>No Available Cards</option>
                        : gymCardsArr.map((gymCard, index) => (
                        <option value={gymCard.name} key={index}>{gymCard.name}</option>    
                    ))
                    }
                </select>
            </div>
            
            <ul>
                {bookingsArr.map((booking, index) => (
                    <ul key={index} className="collect-card-item">
                        <div>
                            Day: {booking.slot.day_slot.day} | Start Time: {booking.slot.start_time}
                            {gymCardsArr.length != 0 ? <button onClick={() => handleSubmit(booking)}>Collect Card</button> : <button>Error</button>}
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

export default CollectCard;