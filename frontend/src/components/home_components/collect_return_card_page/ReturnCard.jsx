import { useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ReturnCard = () => {
    const [gymSession, setGymSession] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        checkOngoingSession();
    }, [])

    const checkOngoingSession = () => {
        axios
            .get('http://localhost:3000/ongoing_gym_session', {withCredentials: true})
            .then(response => {
                console.log("Obtaining Ongoing Gym Sessions", response)
                if (response.data) {
                    setGymSession(response.data);
                } else if (response.data == null) {
                    navigate("/collect_card");
                } else {
                    console.log("Unknown Outcome from axios get_ongoing_sessions")
                }
            })
            .catch(error => {
                console.log("Error obtaining gym sessions", error)
            })
    }

    const handleReturn = () => {
        axios
            .put('http://localhost:3000/gym_sessions/'+ gymSession.id, {
                status: 'past'
            })
            .then(response => {
                console.log("Updating Gym Sessions...", response)
                if (response.data.updated) {
                    checkOngoingSession();
                } else if (!response.data.updated) {
                } else {
                    console.log("Unknown Outcome from axios get_ongoing_sessions")
                }
            })
            .catch(error => {
                console.log("Error Updating Gym Session", error)
            })
    }

    return (
        <div className="return-card-container">
            <div>
                <h2>Return Card</h2>
                <p>Gym Card: {gymSession && gymSession.gym_card.name}</p>
                <button onClick={() => handleReturn()}>Return Card</button>
            </div>

            <div className="buttons">
                <button onClick={() => navigate('/homepage')}>Back to Homepage</button>
            </div>
        </div>
    );
    
}

export default ReturnCard;