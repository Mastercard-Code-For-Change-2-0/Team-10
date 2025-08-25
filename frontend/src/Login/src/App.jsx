import React from 'react';
import './App.css';
//  import ImageSection from './ImageSection';
import SignupForm from './Signup';
import LoginForm from './Login';
import { BrowserRouter, Routes ,Route,Link} from 'react-router-dom';
function App1() {
  return (
    
    <div className="login-container">
      <BrowserRouter>
     <Routes>
     <Route path="/" element={<SignupForm />} />
      <Route path="/Login" element={<LoginForm/>}/>
      <Route path="/Signup" element={<SignupForm />}/>
    </Routes>
    </BrowserRouter>
    
      
    </div>
  );
}
export default App1;
