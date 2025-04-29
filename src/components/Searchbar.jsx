import { useState, useRef } from "react";

const Searchbar = ({ books }) => {
    const dropdownRef = useRef(null);
    // const inputRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {     
        const value = e.target.value;  
        const filteredBooks = books.filter((book) => {
            return book.title?.toLowerCase().includes(searchInput.toLowerCase() ||
        book.author?.toLowerCase().includes(searchResults))
        });
        console.log(filteredBooks);

        setSearchInput(value);
        setSearchResults(filteredBooks);
    }

    return (
        <>
            <div>
                <label>
                    Search:&nbsp;
                <input 
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
                {
                    searchInput.length > 0 && searchResults.length > 0 && (
                        <ul ref={dropdownRef} className='dropdown'>
                            {
                                searchResults && searchResults.map((result) => (
                                    <li
                                        key={result.id}
                                        onMouseDown={() => {
                                            searchInput('');
                                            setSearchResults([]);
                                            console.log('Clicked:', result);
                                        }}
                                    >
                                        {result.name}
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