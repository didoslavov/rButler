import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Default from './components/Default/Default.jsx';
import CreateHouseholdForm from './components/CreateHouseholdForm/CreateHouseholdForm.jsx';
import { logout } from './services/authService.js';
import { useEffect, useState } from 'react';
import Details from './components/Details/Details.jsx';
import MyHouseholds from './components/MyHouseholds/MyHouseholds.jsx';
import Auth from './components/Auth/Auth.jsx';
import ShoppingList from './components/ShoppingList/ShoppingList.jsx';
import TodoList from './components/TodoList/TodoList.jsx';
import AllHouseholds from './components/AllHouseholds/AllHouseholds.jsx';

function App() {
    const [token, setToken] = useState(localStorage.getItem('userData')?.token);
    const [user, setUser] = useState(localStorage.getItem('userData'));

    useEffect(() => {
        const localStorageToken = localStorage.getItem('userData')?.token;
        const localStorageUser = localStorage.getItem('userData');

        setToken(localStorageToken);
        setUser(localStorageUser);
    }, []);

    const onLogout = () => {
        logout();
        setToken('');
        setUser('');
    };

    return (
        <>
            <Navbar onLogout={onLogout} token={token} user={user} />
            <Routes>
                <Route path="/" element={<Home token={token} setToken={setToken} user={user} />} />
                <Route path="/profile/auth" element={<Auth setUser={setUser} setToken={setToken} />} />
                <Route path="/households" element={<AllHouseholds token={token} />} />
                <Route path="/households/details/:householdId" element={<Details />} />
                <Route path="/households/create" element={<CreateHouseholdForm />} />
                <Route path="/households/:userId" element={<MyHouseholds token={token} user={user} />} />
                <Route path="/lists/shopping/:listId" element={<ShoppingList token={token} />} />
                <Route path="/lists/todo/:listId" element={<TodoList token={token} />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
        </>
    );
}

export default App;
