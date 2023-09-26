import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Default from './components/Default/Default.jsx';
import CreateHouseholdForm from './components/CreateHouseholdForm/CreateHouseholdForm.jsx';
import Profile from './components/Profile/Profile.jsx';
import { logout } from './services/authService.js';
import { useEffect, useState } from 'react';
import Details from './components/Details/Details.jsx';

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

    const profileLink = token ? `/profile/:userId` : '/profile/auth';

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
                {token ? (
                    <Route path={profileLink} element={<Profile setUser={setUser} user={user} />} />
                ) : (
                    <Route path={profileLink} element={<Profile setUser={setUser} />} />
                )}
                <Route path="/households/create" element={<CreateHouseholdForm />} />
                <Route path="/household/details/:householdId" element={<Details />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
        </>
    );
}

export default App;
