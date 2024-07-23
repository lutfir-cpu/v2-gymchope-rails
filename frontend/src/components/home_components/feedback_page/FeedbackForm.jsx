import { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css';


const FeedbackForm = () => {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/feedbacks',
                { feedback: { feedback } },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(response.data);
            setResponseMessage("Feedback Submitted Successfully!")
            setSubmitted(true);

        } catch (error) {
            console.log('Error submitting feedback', error);
            console.log(error.response.data)
            setResponseMessage("Error in submitting feedback! Please try again.")
        }
    }

    if (submitted) {
        return (
            <div className="feedback-container">
                <p>{responseMessage}</p>
                <p>Thanks for the feedback!</p>
                <button className="submit-another" onClick={() => setSubmitted(false)}>
                    Submit More Feedback
                </button>
            </div>
        );
    }

    return (
        <div className="feedback-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedback">Feedback</label>
                <textarea id="feedback" value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Please write your feedback before submitting!"/>
                <button type="submit" disabled={!feedback.trim()}>Submit</button>
            </form>
        </div>
    );
}

export default FeedbackForm;