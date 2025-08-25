import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import LandingPage from './LandingPage.jsx';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
