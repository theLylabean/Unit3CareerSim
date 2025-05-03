import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../API/index.js";
import '../css/login.css';

const Login = ({ setToken, setUser }) => {
    const [loginError, setLoginError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
            e.preventDefault();
            setLoginError('');
            try {
                const response = await getLogin(email, password);
                console.log(response);
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    setToken(response.token);
                    setUser(response);
                    navigate('/account')
                } else {
                    setLoginError(response.message || '** Invalid username or password **')
                }
                } catch (error) {
                    console.error('Login error:', error.message);
                    setLoginError('Login failed. Please try again.');
                }   
    } 
      
    return (
        <>
            <div className='login-container'>
                <div className='login-header-container'>
                    <h2>
                        Login
                    </h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className='login-username'>
                            <label>Username:</label>
                            &nbsp;
                            <input 
                                className='form-username'
                                type='text'
                                required
                                name='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className='login-password'>
                            <label>Password:</label>
                            &nbsp;
                            <input 
                                className='form-password'
                                type='password'
                                required
                                minLength={7}
                                name='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {loginError && <p>{loginError}</p>}
                        <br />
                        <button
                            className='submitButton'
                            type='submit'
                            >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login