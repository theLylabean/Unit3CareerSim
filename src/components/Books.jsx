/* 
Step 1: ✅
    -import useEffects, api call from .js file, and any css files.
    -make sure the export is in the file and that you import it to the app.jsx file.
Step 2: ✅
    -make sure to put the api function in a useEffect. nothing goes in the dependency array here
    -don't forget to put the setter in and the response is returning the array just like that. no need for response.data or response.books for it to rend on page.
Step 3: ✅
    -make sure you have your return inside of a div. 
    -your .map function needs to be wrapped in a div as well. 
    -deconstruct the response data if you want to. if you do this, don't forget to pass in id or the key won't work.
Step 4: ✅
    -don't forget to pass the books={books} and setBooks={setBooks} to the component in app.jsx

***UPDATED PLAN***
    -put a ternary in to filter through the books array if the searchTerm is > 0 so that the handleSearch function from the searchbar.jsx can filter through and display those books, otherwise it will show the complete array of books that have not been filtered. ✅
*/

import { useEffect } from 'react';
import { getBooks } from '../API/index.js';
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar.jsx';
import fallbackImg from '../pictures/bookcover1.jpg';
import '../css/books.css';

const Books = ({ books, setBooks, setSingleBook, searchTerm, setSearchTerm, searchResults, setSearchResults }) => {
    const navigate = useNavigate();

    const handleClick = (book) => {
        setSingleBook(book);
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/books/${book.id}`);
    }

    useEffect(() => {
        const getBooksAPI = async() => {
                const response = await getBooks();
                setBooks(response);
            }
        getBooksAPI();
    }, [])

    return (
        <>
            <div className='books-header-container'>
                    <h1>
                        Book Library
                    </h1>
                    <Searchbar 
                        books={books}
                        setBooks={setBooks}
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
                <div className='books-page'>
                    <div className='books-container'>
                    {
                        searchResults.length > 0 ? (
                            searchResults.map((book) => {
                            const { id, title, coverimage, author } = book;
                        if (!book || !book.id || !book.title) return null;
                        return (
                            <div 
                                key={id}
                                className='book-card'>
                                <h3>
                                    {title}
                                </h3>
                                <img 
                                    className='book-image'
                                    src={coverimage}
                                    onError={(e) => {
                                        e.target.onError = null;
                                        e.target.src = fallbackImg;
                                    }}
                                />
                                <p>{author}</p>
                                <button onClick={() => handleClick(book)}>
                                    More Info
                                </button>
                            </div>
                        )}) 
                        ) : (
                        Array.isArray(books) && books.map((book) => {
                        const { id, title, coverimage, author } = book;
                        if (!book || !book.id || !book.title) return null;
                        return (
                            <div 
                                key={id}
                                className='book-card'>
                                <h3>
                                    {title}
                                </h3>
                                <img 
                                    className='book-image'
                                    src={coverimage}
                                    onError={(e) => {
                                        e.target.onError = null;
                                        e.target.src = fallbackImg;
                                    }}
                                />
                                <p>{author}</p>
                                <button onClick={() => handleClick(book)}>
                                    More Info
                                </button>
                            </div>
                        )
                    }))}
                </div>
            </div>
        </>
    )
}

export default Books