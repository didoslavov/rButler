import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Default from './components/Default/Default.jsx';
import CreateHouseholdForm from './components/CreateHouseholdForm/CreateHouseholdForm.jsx';
import Details from './components/Details/Details.jsx';
import MyHouseholds from './components/MyHouseholds/MyHouseholds.jsx';
import Auth from './components/Auth/Auth.jsx';
import ShoppingList from './components/ShoppingList/ShoppingList.jsx';
import TodoList from './components/TodoList/TodoList.jsx';
import AllHouseholds from './components/AllHouseholds/AllHouseholds.jsx';
import Footer from './components/Footer/Footer.jsx';

import './App.css';

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
                    <Route path="/households/create" element={<CreateHouseholdForm />} />
                    <Route path="/households/:userId" element={<MyHouseholds />} />
                    <Route path="/lists/shopping/:listId" element={<ShoppingList />} />
                    <Route path="/lists/todo/:listId" element={<TodoList />} />
                </>
                <Route path="*" element={<Default />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
