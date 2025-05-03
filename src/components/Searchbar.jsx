/*
Step 1: ✅
    -import any useEffect, useStates, props, and API calls you will need. ❌
Step 2: ✅
    -write out the search function:
        -filtered list ✅
        -drop down menu that displays matches ❌
            -based on author or title ✅
        -list goes away when clicked outside of the input area or when empty. ❌
        -function to handle clicking on a book and taking you to the singleBook page for that result. ❌
Step 3: ✅
    -write out return, which should just be the label and input. ✅
    -also a section to dsiplay the dropdown field. ❌

***UPDATED PLAN*** 
    -filter through the array of books that already exists from the books.jsx component that was made. ✅
    -take out the dropdown function and useStates associated with it but leave all of the props used. ✅
        -the actual search function will be displayed here but will run inside of books.jsx as part of the handleClick function. ✅
    -only display label and input field in the return. ✅
    -MAKE SURE TO PASS ANY PROPS TO WHERE THE COMPONENT IS GETTING RENDERED. ✅
        -because the component is getting rendered in books.jsx, props will need to be passed to it and to <Books /> inside the app.jsx file. ✅
*/

import '../css/searchbar.css';

const Searchbar = ({ books, setBooks, searchTerm, setSearchTerm, setSearchResults }) => {
    

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const lowerCase = searchTerm.toLowerCase();
        const filteredBooks = books.filter((book) => 
            book.title?.toLowerCase().includes(lowerCase) ||
            book.author?.toLowerCase().includes(lowerCase))
            
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