/*
Step 1: ✅
    -Fetch the account data from the provided API (in the api.js file)
Step 2: ✅
    -setup function outline. don't forget to export it to the app.jsx file.
Step 3: ✅
    -create the return for what info you want to show. the api has options for first name, last name, email, id, and an array of the books (objects) you've reserved.
Step 4: 
    -make sure to put the token in the api call to authenticate the user.
Step 5: 
    Conditionally render a message for users that prompts them to log in or create an account. Don't auto route this time.
*/

import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getAccountDetails } from "../API/index.js";
import fallbackImg from '../pictures/bookcover1.jpg';

const Account = ({ user, setUser, singleBook }) => {
    // const navigate = useNavigate();

    useEffect(() => {
        const getAccountDetailsAPI = async () => {
            const response = await getAccountDetails();
            console.log(response);
            setUser(response);
        }
        getAccountDetailsAPI();
    }, []);

    return (
        <>
            <div className='accountPage-container'>
                <div className='personal-info'>
                    <h1>
                        Welcome, {user?.firstname}!
                    </h1>
                    <p>Name:&nbsp;{user.firstname}&nbsp;{user.lastname}</p>
                    <p>Email:&nbsp;{user.email}</p>
                    <div>
                        {
                           user &&  (user.reservations.map((book) => {
                            const { id, title, coverimage } = book;
                            if (singleBook.availabe === false) return null;
                            return (
                                <div key={id}>
                                    <h3>
                                        {title}
                                    </h3>
                                    <img 
                                        src={coverimage}
                                        onError={(e) => {
                                            e.target.onError = null;
                                            e.target.src = fallbackImg;
                                        }}
                                    />
                                </div>
                            )
                           }))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Account