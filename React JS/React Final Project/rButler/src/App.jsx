import './App.css';
import Home from './components/Home/Home.jsx';
import Login from './components/Auth/Auth.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
    return (
        <>
            <Navbar />
            <Home />
            <Login />
        </>
    );
}

export default App;
