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

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

    const profileLink = token ? `/households/:userId` : '/profile/auth';
    useEffect(() => {
        const localStorageToken = localStorage.getItem('authToken');
        const localStorageUser = JSON.parse(localStorage.getItem('userInfo'));

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
            <Navbar onLogout={onLogout} token={token} profileLink={profileLink} user={user} />
            <Routes>
                <Route path="/" element={<Home token={token} setToken={setToken} user={user} />} />
                <Route path="/profile/auth" element={<Auth setUser={setUser} setToken={setToken} />} />
                <Route path="/households/create" element={<CreateHouseholdForm />} />
                <Route path="/households/details/:householdId" element={<Details />} />
                <Route path="/households/:userId" element={<MyHouseholds token={token} user={user} />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
        </>
    );
}

export default App;
