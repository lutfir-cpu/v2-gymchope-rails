import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/registrations", {
            user: {
                email: email,
                password: password,
                password_confirmation: confirmPassword,
                first_name: first_name
            }
        }, { withCredentials: true }
        ).then(response => {
            console.log("reg res: ", response);
        }).catch(error => {
            console.log("reg error: ", error)
        })

        navigate("/");
    }


    return (
        <div className={'mainContainer'}>
        <div className={"titleContainer"}>
            <div>Create Your Account</div>
        </div>

        <form onSubmit={handleSubmit}>
            {/*firstname*/}
            <div className={"input-container"}>
                <input
                    type={"first_name"}
                    value={first_name}
                    placeholder={"Enter your first name"}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className={"input-box"}
                />
            </div>
            
            {/*Email*/}
            <div className={"input-container"}>
                <input
                    type={"email"}
                    value={email}
                    placeholder={"Enter your email"}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={"input-box"}
                />
            </div>

            {/*Password*/}
            <div className={'input-container'}>
                <input
                    type={"password"}
                    value={password}
                    placeholder={"Enter your password"}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={"input-box"}
                />
            </div>

            {/*Confirm Password*/}
            <div className={'input-container'}>
                <input
                    type={"password"}
                    value={confirmPassword}
                    placeholder={"Confirm your password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={"input-box"}
                />
            </div>

            {/*Signup button*/}
            <div className={'input-container'}>
                <button
                    type={"submit"}
                    value={"Create Account"}
                    className={'inputButton'}
                >Sign up
                </button>
            </div>

            <div className={"create-option"}>
                <p>-----or create an admin account-----</p>
            </div>

            {/*Signup button for admins*/}
            <div className={'input-container'}>
                <button
                    type={"submit"}
                    value={"Create Account"}
                    className={'inputButton'}
                >Create Admin Account
                </button>
            </div>
        </form>
    </div>
    );
}


export default Signup;