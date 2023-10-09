import { Route, Routes } from 'react-router-dom';
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
import { getUserData } from './utils/userData.js';

function App() {
    const [user, setUser] = useState(getUserData());
    const [token, setToken] = useState(user?.token);

    useEffect(() => {
        const localStorageUser = getUserData();
        const localStorageToken = localStorageUser?.token;

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
            <Navbar onLogout={onLogout} user={user} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/profile/auth" element={<Auth setUser={setUser} setToken={setToken} />} />
                <Route path="/households" element={<AllHouseholds user={user} />} />
                <Route path="/households/details/:householdId" element={<Details user={user} />} />
                <Route path="/households/create" element={<CreateHouseholdForm user={user} />} />
                <Route path="/households/:userId" element={<MyHouseholds user={user} />} />
                <Route path="/lists/shopping/:listId" element={<ShoppingList user={user} />} />
                <Route path="/lists/todo/:listId" element={<TodoList user={user} />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
        </>
    );
}

export default App;
