/*
Step 1: ✅
    -create welcome page
Step 2: ✅
    -create header and short description of website.
Step 3: ✅
    -create link to naviate to book catelog page.
*/


import { Link } from 'react-router-dom';
import '../css/home.css';
import bookLogo from '../pictures/books.png'

const Home = () => {
    return (
        <>
            <div className="home-container">
                <header className="home-header">
                    <h1><img id='logo-image' src={bookLogo}/> Welcome to Lynn's Library Lane</h1>
                    <p>Explore our collection of books, find your next favorite read, and get inspired!</p>
                    <Link to="/books" className="browse-button">Browse the Catalog</Link>
                </header>
            </div>
        </>
    )
}

export default Home