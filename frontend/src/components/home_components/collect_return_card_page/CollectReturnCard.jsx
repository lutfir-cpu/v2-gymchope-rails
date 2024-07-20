import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './CollectReturnCard.css'

const CollectReturnCard = () => {
    const navigate = useNavigate();
    const [bookingsArr, setBookingsArr] = useState([]);
    const [gymCardsArr, setGymCardsArr] = useState([]);
    const [gymCard, setGymCard] = useState(null);

    useEffect(() => {
        getBookings();
        getGymCards();
    }, []);

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
            })
            .catch(error => {
                console.log("Error obtaining GymCards", error)
            })
    };


    const handleDeleteBooking = (booking) => {
        /*
        axios
            .delete('http://localhost:3000/bookings/' + booking.id, {
                booking: booking
            })
            .then(response => {
                console.log("Deleting Booking...", response)
                if (response.data.booking_deleted) {
                    console.log("Booking Deleted Successfully");
                    getBookings();
                } else if (response.data.booking_deleted == false) {
                    console.log('Unsuccessful Booking Delete');
                } else {
                    console.log("Unknown Outcome from axios Delete Booking");
                }
            })
        */
    }

    const handleChange = (e) => {
        const selectedCard = gymCardsArr.find(card => card.name === e.target.value);
        setGymCard(selectedCard);
        console.log('changed')
    };


    return (
        <div className="collect-return-card-container">
            <h2>Collect Card</h2>
            <div>
                <label>Please select the card you are collecting: </label>
                <select name="GymCard" id="GymCards" onChange={handleChange}>
                    <option value={""}>Select Gym Card</option>

                    {gymCardsArr.map((gymCard, index) => (
                        <option value={gymCard.name} key={index}>{gymCard.name}</option>    
                    ))}
                </select>
            </div>

            <h2>{gymCard && gymCard.name}</h2>

            <ul>
                {bookingsArr.map((booking, index) => (
                    <ul key={index} className="collect-return-card-item">
                        <div>
                            Day: {booking.slot.day_slot.day} | Start Time: {booking.slot.start_time}
                            <button onClick={() => handleSelect(booking)}>Collect Card</button>
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

export default CollectReturnCard;