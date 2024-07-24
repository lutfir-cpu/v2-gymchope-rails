import { useState, useEffect } from "react";
import { useNavigate, } from "react-router-dom";
import axios from "axios";

const History = () => {
    const [logArr, setLogArr] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        obtainUserData();
    }, []);
    
    const getLogs = (user) => {
        axios
        .post('http://localhost:3000/get_histories_by_user', {user})
        .then(response => {
            console.log("Obtaining Logs ...", response)
            setLogArr(response.data)
        })
        .catch(error => {
            console.log("Error obtaining logs", error)
        })
    };

    const obtainUserData = () => { 
        axios.get('http://localhost:3000/logged_in', {withCredentials: true} )
            .then(response => {
                console.log('Obtaining User', response)
                if (response.data.logged_in) {
                    setUser(response.data.user)
                    getLogs(response.data.user)
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
        <div className="history-container">
            <h2>History</h2>
            <ul>
                {logArr.map((log, index) => (
                    <ul key={index} className="log-item">
                        <div>
                            Time: {log.created_at} | Users: {log.log_message}
                        </div>
                    </ul>
                ))}
            </ul>
            <div className="buttons">
                <button onClick={() => navigate('/homepage')}>Back to Homepage</button>
            </div>
        </div>
    );
}

export default History;