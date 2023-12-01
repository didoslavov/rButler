import { Route, Routes } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Auth from './components/Auth/Auth.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import AllHouseholds from './components/AllHouseholds/AllHouseholds.jsx';
import MyHouseholds from './components/MyHouseholds/MyHouseholds.jsx';
import CreateHousehold from './components/CreateHousehold/CreateHousehold.jsx';
import Details from './components/Details/Details.jsx';
import List from './components/List/List.jsx';
import Profile from './components/Profile/Profile.jsx';
import Footer from './components/Footer/Footer.jsx';
import Default from './components/Default/Default.jsx';

import './App.css';
import EditProfile from './components/Profile/EditProfile/EditProfile.jsx';
import ChangePassword from './components/Profile/ChangePassword/ChangePassword.jsx';
import LearnMore from './components/LearnMore/LearnMore.jsx';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/auth" element={<PublicRoute />}>
                    <Route path="/profile/auth" element={<Auth />} />
                </Route>
                <>
                    <Route path="/profile/*" element={<PrivateRoute />}>
                        <Route path="/profile/*" element={<Profile />}>
                            <Route path="edit" element={<EditProfile />} />
                            <Route path="reset-password" element={<ChangePassword />} />
                        </Route>
                    </Route>
                    <Route path="/households" element={<AllHouseholds />} />
                    <Route path="/households/details/:householdId" element={<Details />} />
                    <Route path="/households/create" element={<PrivateRoute />}>
                        <Route path="/households/create" element={<CreateHousehold />} />
                    </Route>
                    <Route path="/households/:userId" element={<PrivateRoute />}>
                        <Route path="/households/:userId" element={<MyHouseholds />} />
                    </Route>
                    <Route path="/lists/shopping/:listId" element={<PrivateRoute />}>
                        <Route path="/lists/shopping/:listId" element={<List type={'shopping'} />} />
                    </Route>
                    <Route path="/lists/todo/:listId" element={<PrivateRoute />}>
                        <Route path="/lists/todo/:listId" element={<List type={'todo'} />} />
                    </Route>
                </>
                <Route path="/learn-more" element={<LearnMore />} />
                <Route path="*" element={<Default />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
