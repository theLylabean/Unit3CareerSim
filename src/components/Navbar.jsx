/*
Step 1: ✅
    -setup function outline. don't forget to export the function and import to app.jsx
Step 2: ✅
    -import any react-router-dom, css files, and other things you'll use
Step 3: ✅
    -use token to authenticate user and render only what an authorized use can see (account, and logout). unauthorized users should see (home, book library, login, register).
*/

import { Link, useNavigate } from "react-router-dom";
import '../css/navbar.css';

const Navbar = ({ token, setToken, user }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <>
        <div>
            <nav className='navbar-container'>
                <div>
                    <h2>Lynn's Library Lane</h2>
                </div>
                <div className='nav-links'>
                    <Link to='/'>
                        <span className="material-icons">
                            home
                        </span>
                    </Link>
                    &nbsp;
                    <Link to='/books'>
                        <span className="material-icons">
                            local_library
                        </span>
                    </Link>
                    &nbsp;
                    {
                        token ? (
                            <>
                                <Link to='/account'>
                                    <span className="material-icons">
                                        account_circle
                                    </span>
                                </Link>
                                &nbsp;
                                <button 
                                    className='nav-button'
                                    onClick={() => handleLogout()}>
                                <span className="material-icons">
                                    logout
                                </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                <span className="material-icons">
                                    login
                                </span>
                                </Link>
                                &nbsp;
                                <Link to='/register'>
                                <span className="material-icons">
                                    person_add
                                </span>
                                </Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </div>
        </>
    )
}
export default Navbar