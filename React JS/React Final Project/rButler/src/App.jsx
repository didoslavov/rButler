import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Default from './components/Default/Default.jsx';
import CreateHouseholdForm from './components/CreateHouseholdForm/CreateHouseholdForm.jsx';
import Profile from './components/Profile/Profile.jsx';
import { logout } from './services/authService.js';
import { useEffect, useState } from 'react';

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState({});

    const profileLink = token ? `/profile/${user.id}` : '/profile/auth';

    useEffect(() => {
        const localStorageToken = localStorage.getItem('authToken');

        setToken(localStorageToken);
    }, [token]);

    const onLogout = () => {
        logout();
        setToken('');
    };

    return (
        <>
            <Navbar onLogout={onLogout} token={token} profileLink={profileLink} />
            <Routes>
                <Route path="/" element={<Home token={token} setToken={setToken} />} />
                {token ? (
                    <Route path={profileLink} element={<Profile setUser={setUser} />} />
                ) : (
                    <Route path={profileLink} element={<Profile setUser={setUser} />} />
                )}
                <Route path="/create-household" element={<CreateHouseholdForm />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
        </>
    );
}

export default App;
