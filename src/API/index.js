
const baseUrl = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api'

const getBooks = async() => {
    try {
        const res = await fetch(`${baseUrl}/books`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

const getSingleBook = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/books/${id}`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message)
    }
}

const getLogin = async (email, password) => {
    console.log('trying to fetch login at URL:', `${baseUrl}/users/login`)
    try {
        const res = await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
        });
        console.log('fetch response:', res)
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

const getRegister = async (firstname, lastname, email, password, confirmPassword) => {
    try {
        const res = await fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({ firstname, lastname, email, password }),
        });
        const result = await res.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

const reserveBook = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${baseUrl}/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ bookId: id })
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message)
    }
}

const getAccountDetails = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${baseUrl}/users/me`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch account details: ${res.status}`)
        }
        const result = await res.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

export { getBooks, getSingleBook, getLogin, getRegister, reserveBook, getAccountDetails }