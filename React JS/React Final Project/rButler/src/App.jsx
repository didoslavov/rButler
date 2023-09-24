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
            <Navbar onLogout={onLogout} token={token} />
            <Routes>
                <Route path="/" element={<Home token={token} setToken={setToken} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-household" element={<CreateHouseholdForm />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
        </>
    );
}

export default App;
