import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../css/searchbar.css';

const Searchbar = ({ books, setBooks, searchTerm, setSearchTerm, setSearchResults }) => {
    

    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        setSearchTerm(searchTerm);
        console.log(searchTerm)

        const lowerValue = searchTerm.toLowerCase();
        const filteredBooks = books.filter((book) => 
            book.title?.toLowerCase().includes(lowerValue) ||
            book.author?.toLowerCase().includes(lowerValue))
            
            if (searchTerm) {
                setSearchResults(filteredBooks)
                console.log('strings', filteredBooks)
            } else {
                setBooks(books)
                console.log('not stings', books)
            }
        };

    return (
        <>
            <div className='search-container'>
                <label>
                    Search:&nbsp;
                </label>
                <input 
                    className='search-input'
                    placeholder='search by title or author'
                    type='text'
                    id='search'
                    name='search'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </>
    )
}

export default Searchbar