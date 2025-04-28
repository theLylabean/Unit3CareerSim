/* 
Step 1: ✅
    -setup function outline. don't forget to export at the end and import this file to app.jsx when you're done.
Step 2: ✅
    -import useStates, useEffects, and useParams. don't forget to define all of them.
    -import useNavigate if you need it.
Step 3: ✅
    -Fetch the book data from the provided API. 
Step 4: ✅
    -setup the return for how you want the info to display. don't forget to include amu info that may be required.
    -You may consider conditionally rendering a 'Checkout' button for logged in users. */

    import { useParams, useNavigate } from "react-router-dom";
    import { useState, useEffect } from "react";
    import { getSingleBook } from "../API/index.js";
    import { reserveBook } from "../API/index.js";
    import fallbackImg from '../pictures/bookcover1.jpg';
    
    const  SingleBook = ({ singleBook, setSingleBook, token }) => {
        // const [bookDetails, setBookDetails] = useState(null);
        const [checkoutError, setCheckoutError] = useState(null);
        const {id} = useParams();
        const navigate = useNavigate();
    
        const handleCheckout = async () => {
            setCheckoutError(null);
    
            try {
                const response = await reserveBook(id);
                setSingleBook(response);
            } catch (error) {
                console.error(error.message);
            }
        } 
    
        useEffect(() => {
            const getBookDetailsAPI = async () => {
                    const response = await getSingleBook(id);
                    setSingleBook(response);
             }
        getBookDetailsAPI();
    }, [id]);
    
        return (
            <>
                <div className='bookDetails-container'>
                    {singleBook && (() => {
                        const { id, title, author, description, coverimage, available, bookId } = singleBook;
                        return (
                            <div key={id}>
                                <h1>{title}</h1>
                                <img 
                                    src={coverimage} 
                                    alt={title}
                                    onError={(e) => {
                                        e.target.onError = null;
                                        e.target.src = fallbackImg;
                                    }} />
                                <p>{author}</p>
                                <p>{description}</p>
                                {/* {
                                    available && token ? (
                                        <button onClick={() => handleCheckout(bookId)}>
                                            Checkout
                                        </button>
                                    ) : (
                                        <>
                                            <p className='checkout-unavailable'>This book is not available to checkout right now.</p>
                                            <button onClick={() => navigate(-1)}>
                                                Go Back
                                            </button>
                                        </>
                                    )
                                } */}
                            </div>
                        );
                    })}
                </div>
            </>
        )
    }
    
    export default SingleBook