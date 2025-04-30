import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Books from './components/Books.jsx';
import Navbar from './components/Navbar.jsx';
import SingleBook from './components/SinlgeBook.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Account from './components/Account.jsx';
import './css/App.css';


function App() {
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [singleBook, setSingleBook] = useState([]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    reservations: [],
  });

  return (
    <div>
      <Navbar 
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route 
          path='/'
          element={
            <Home />
          }
        />
        <Route 
          path='/books'
          element={
            <Books 
              books={books}
              setBooks={setBooks}
              singleBook={singleBook}
              setSingleBook={setSingleBook}
            />
          }
        />
        <Route 
          path='/books/:id'
          element={
            <SingleBook 
              singleBook={singleBook}
              setSingleBook={setSingleBook}
              token={token}
            />
          }
        />
        <Route 
          path='/login'
          element={
            <Login 
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route 
          path='/register'
          element={
            <Register
              token={token}
              setToken={setToken}
              setUser={setUser}
            />
          }
        />
        <Route 
          path='/account'
          element={
            <Account 
              user={user}
              setUser={setUser}
              singleBook={singleBook}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App