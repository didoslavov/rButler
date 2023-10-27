import { Route, Routes } from 'react-router-dom';

import Auth from './components/Auth/Auth.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import AllHouseholds from './components/AllHouseholds/AllHouseholds.jsx';
import MyHouseholds from './components/MyHouseholds/MyHouseholds.jsx';
import CreateHouseholdForm from './components/CreateHouseholdForm/CreateHouseholdForm.jsx';
import Details from './components/Details/Details.jsx';
import List from './components/List/List.jsx';
import Footer from './components/Footer/Footer.jsx';
import Default from './components/Default/Default.jsx';

import './App.css';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/auth" element={<Auth />} />
                <>
                    <Route path="/households" element={<AllHouseholds />} />
                    <Route path="/households/details/:householdId" element={<Details />} />
                    <Route path="/households/create" element={<ProtectedRoute />}>
                        <Route path="/households/create" element={<CreateHouseholdForm />} />
                    </Route>
                    <Route path="/households/:userId" element={<ProtectedRoute />}>
                        <Route path="/households/:userId" element={<MyHouseholds />} />
                    </Route>
                    <Route path="/lists/shopping/:listId" element={<ProtectedRoute />}>
                        <Route path="/lists/shopping/:listId" element={<List type={'shopping'} />} />
                    </Route>
                    <Route path="/lists/todo/:listId" element={<ProtectedRoute />}>
                        <Route path="/lists/todo/:listId" element={<List type={'todo'} />} />
                    </Route>
                </>
                <Route path="*" element={<Default />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
