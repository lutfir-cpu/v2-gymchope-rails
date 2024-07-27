import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaUser } from 'react-icons/fa';
import "./Login.css"

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tried_logging_in, setLogIn] = useState(false);

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/sessions", {
            user: {
                email: email,
                password: password,
            }
        }, {withCredentials: true}
        ).then(response => {
            console.log(response);
            if (response.data && response.data.logged_in) {
                setTimeout(() => navigate("homepage"), 1000);
            } else {
                setLogIn(true);
            }
        }).catch(error => {
            console.log("reg error: ", error)
            setLogIn(true);
        })
    }
    

    return(
      <div className={'mainContainer'}>

          <div className={"titleContainer"}>
              <div className={"title-icon"}>
                  <FaUser className="user-icon"/>
              </div>
          </div>

          <form onSubmit={handleSubmit}>
          {/*Username*/}
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

                {/*Signup button*/}
                <div className={'input-container'}>
                    <button
                        type={"submit"}
                        value={"Log In"}
                        className={'inputButton'}
                    >Log In
                    </button>
                </div>

                <div>
                    <p>{tried_logging_in ? 'Error with logging in...' : ''}</p>
                </div>
          </form>

          <div className={"create-option"}>
              <p>------or create an account------</p>
          </div>
          
          <div className={'input-container'}>
                  <button
                      type={"button"}
                      value={"Create an account"}
                      onClick={navigateToSignUp}
                      className={'inputButton'}
                  >Create Account</button>
          </div>

      </div>
    );
}

export default Login;