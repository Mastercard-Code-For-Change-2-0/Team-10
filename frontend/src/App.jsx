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
import RequirementWizard from './pages/RequirementWizard.jsx'
import MyDonations from './pages/MyDonations.jsx'
import MyRequests from './pages/MyRequests.jsx'
import Notifications from './pages/Notifications.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import ModerationQueue from './pages/admin/ModerationQueue.jsx'
import MatchingSuggestions from './pages/admin/MatchingSuggestions.jsx'
import VerificationQueue from './pages/admin/VerificationQueue.jsx'
import ReportsExport from './pages/admin/ReportsExport.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import ReceiverDashboard from './pages/receiver/Dashboard.jsx'
import DonorDashboard from './pages/donor/Dashboard.jsx'
import DonationDetail from './pages/DonationDetail.jsx'
import RequestDetail from './pages/RequestDetail.jsx'
import Forbidden from './pages/Forbidden.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  <Route path="/admin" element={<ProtectedRoute allow={["admin"]}><AdminDashboard /></ProtectedRoute>} />
  <Route path="/receiver" element={<ReceiverDashboard />} />
  <Route path="/donor" element={<DonorDashboard />} />
  <Route path="/donate" element={<DonationWizard />} />
  <Route path="/requests" element={<Requests />} />
  <Route path="/browse" element={<BrowseDonations />} />
  <Route path="/about" element={<About />} />
  <Route path="/request" element={<RequirementWizard />} />
  <Route path="/me/donations" element={<MyDonations />} />
  <Route path="/me/requests" element={<MyRequests />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/settings" element={<ProfileSettings />} />
  <Route path="/admin/moderation" element={<ModerationQueue />} />
  <Route path="/admin/matching" element={<MatchingSuggestions />} />
  <Route path="/admin/verification" element={<VerificationQueue />} />
  <Route path="/admin/reports" element={<ReportsExport />} />
  <Route path="/donations/:id" element={<DonationDetail />} />
  <Route path="/requests/:id" element={<RequestDetail />} />
  <Route path="/forbidden" element={<Forbidden />} />
  <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
