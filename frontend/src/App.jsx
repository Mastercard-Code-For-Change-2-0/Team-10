import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import DonationWizard from './pages/DonationWizard.jsx'
import Requests from './pages/Requests.jsx'
import About from './pages/About.jsx'
import BrowseDonations from './pages/BrowseDonations.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  <Route path="/donate" element={<DonationWizard />} />
  <Route path="/requests" element={<Requests />} />
  <Route path="/browse" element={<BrowseDonations />} />
  <Route path="/about" element={<About />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}
