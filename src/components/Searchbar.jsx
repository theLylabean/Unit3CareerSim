import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../css/searchbar.css';

const Searchbar = ({ books }) => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    // const inputRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {     
        const value = e.target.value;  
        setSearchInput(value);
        const lowerValue = value.toLowerCase();
        const filteredBooks = books.filter((book) => {
            return (
                book.title?.toLowerCase().includes(lowerValue) ||
                book.author?.toLowerCase().includes(lowerValue))
        });
        console.log(filteredBooks);

        setSearchResults(filteredBooks);
    }

    return (
        <>
            <div>
                <label>
                    Search:&nbsp;
                <input 
                    className='search-input'
                    placeholder='search by title or author'
                    type='text'
                    id='search'
                    name='search'
                    value={searchInput}
                    onChange={handleChange}
                    onBlur={(e) => {
                        setTimeout(() => {
                            if (
                                dropdownRef.current &&
                                !dropdownRef.current.contains(document.activeElement)
                            ) {
                                setSearchInput('')
                                setSearchResults([]);
                            }
                        }, 200);
                    }}
                    />
                </label>
                <br />
                {
                    searchInput.length > 0 && searchResults.length > 0 && (
                        <ul ref={dropdownRef} className='dropdown'>
                            {
                                searchResults && searchResults.map((result) => (
                                    <li
                                        key={result.id}
                                        onMouseDown={() => {
                                            setSearchInput('');
                                            setSearchResults([]);
                                            navigate(`/books/${result.id}`);
                                            console.log('Clicked:', result);
                                        }}
                                    >
                                        {result.title} - {result.author}
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </>
    )
}

export default Searchbar