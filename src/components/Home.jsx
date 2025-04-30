import '../css/home.css';
import bookLogo from '../pictures/books.png'

const Home = () => {
    return (
        <div>
            <h1>
                <img id='logo-image' src={bookLogo}/>Library App
            </h1>
        </div>
    )
}

export default Home