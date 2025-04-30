/*
Step 1: ✅
    -import api call from api.js. this one does not need to be in a useEffect because we aren't fetching info from the api, we're posting to it. 
        ***side note*** the only thing that needs to be in a useEffect is the actual api calls. useEffect's are inefficient so it's best practice not to use them unless you have to.
Step 2: ✅
    -write useStates.
Step 3: ✅
    -create form outline that matches the useState and api schema:
        1. first name
        2. last name
        3. email
        4. password
        5. confirm password
Step 4: ✅
    -create a handleSubmit function with the api call and any conditions, errors, and authentication.
Step 5: ✅
    -import props. and import any reac/react-router-dom/other to the beginning of the file.
    -DON'T FORGET TO EXPORT THE FUNCTION!! and import to app.jsx and any other components that need it (if any).
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegister } from "../API/index.js";
import '../css/register.css';

const Register = ({ setUser, setToken }) => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState(null);
    const [registerUser, setRegisterUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterError(null);

        const { firstname, lastname, email, password, confirmPassword } = registerUser;
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            setRegisterError('Please fill in all fields.')
            return;
        }
        if (password !== confirmPassword) {
            setRegisterError('Passwords do not match.')
            return;
        }

        try {
            const response = await getRegister(firstname, lastname, email, password, confirmPassword);
            console.log(response);
            if (!response.token) {
                setRegisterError(response.message);
                return
            }
            setUser({
                firstname: response.firstname,
                lastname: response.lastname,
                email: response.email,
                password: response.password,
            })
            setToken(response.token)
            localStorage.setItem('token', response.token);
            navigate('/')
        } catch (error) {
            console.error(error.message);
            setRegisterError('Failed to register. Please try again.', error.message);
        }
    }

    return (
        <div>
            <h2>
                Register
            </h2>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <label>First Name:</label>
                    &nbsp;
                    <input 
                        className='firstname'
                        name='firstname'
                        type='text'
                        value={registerUser.firstname}
                        onChange={e => setRegisterUser(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value})
                        )}
                    />
                </div>
                <br />
                <div>
                    <label>Last Name:</label>
                    &nbsp;
                    <input 
                        className='lastname'
                        name='lastname'
                        type='text'
                        value={registerUser.lastname}
                        onChange={e => setRegisterUser(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value})
                        )}
                    />
                </div>
                <br />
                <div>
                    <label>Username/Email:</label>
                    &nbsp;
                    <input 
                        className='form-username'
                        name='email'
                        type='text'
                        required
                        value={registerUser.email}
                        onChange={e => setRegisterUser(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value})
                        )}
                    />
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    &nbsp;
                    <input 
                        className='formPassword'
                        name='password'
                        type='password'
                        required
                        minLength={8}
                        value={registerUser.password}
                        onChange={e => setRegisterUser(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value})
                        )}
                    />
                </div>
                <br />
                <div>
                    <label>Confirm Password:</label>
                    &nbsp;
                    <input 
                        className='formPassword'
                        name='confirmPassword'
                        type='password'
                        required
                        minLength={8}
                        value={registerUser.confirmPassword}
                        onChange={e => setRegisterUser(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value})
                        )}
                    />
                </div>
                {registerError && <p>{registerError}</p>}
                <br />
                <button
                    className='submitButton'
                    type='submit'
                    >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register