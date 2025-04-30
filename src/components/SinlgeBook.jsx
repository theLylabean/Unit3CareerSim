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
    import '../css/singlebook.css';
    
    const  SingleBook = ({ singleBook, setSingleBook, token }) => {
        const [successMessage, setSuccessMessage] = useState('');
        const {id} = useParams();
        const navigate = useNavigate();
    
        const handleCheckout = async () => {
            try {
                const response = await reserveBook(id);
                console.log('reserveBook response:', response);
                setSuccessMessage('Book Reserved!');
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
        }, []);

        return (
            <>
                <div className='bookDetails-container'>
                    <div key={singleBook.id}>
                        <h1>{singleBook.title}</h1>
                            <img 
                                src={singleBook.coverimage} 
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = fallbackImg;
                                }} 
                            />
                            <p>{singleBook.author}</p>
                            <p>{singleBook.description}</p>
                            <button onClick={() => navigate(-1)}>
                                Go Back
                            </button>
                            &nbsp;
                            {
                                token && singleBook.available && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleCheckout();
                                        }}
                                    >
                                        Checkout
                                    </button>
                                )
                            } 
                            <br />
                            {
                                successMessage && (
                                    <p className='checkout-unavailable'>Success</p>
                                )
                            }
                    </div>
                </div>
            </>
        )
    }
    
    export default SingleBook