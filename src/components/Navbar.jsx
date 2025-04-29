/*
Step 1: ✅
    -setup function outline. don't forget to export the function and import to app.jsx
Step 2: ✅
    -import any react-router-dom, css files, and other things you'll use
Step 3: ✅
    -use token to authenticate user and render only what an authorized use can see (account, and logout). unauthorized users should see (home, book library, login, register).
*/

import { Link, useNavigate } from "react-router-dom"


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
            <h2>Lynn's Library Lane</h2>
            <nav className='navbar-container'>
                <div className='nav-links'>
                    <Link to='/'>
                        Home
                    </Link>
                    &nbsp;
                    <Link to='/books'>
                        Book Library
                    </Link>
                    &nbsp;
                    {
                        token ? (
                            <>
                                <Link to='/account'>
                                    Account Page
                                </Link>
                                &nbsp;
                                <button onClick={() => handleLogout()}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>Login</Link>
                                &nbsp;
                                <Link to='/register'>Register</Link>
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