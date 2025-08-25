import React from 'react';
import { Link } from "react-router-dom";
function LoginForm() {
  return (
        <div className="form-section">
      <h2>Log in Your account</h2>
      <p className="login-link">
        Don't have an account? <Link to="/Signup">Sign up</Link>
      </p>
      <form>
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <button type="submit" className="submit-button">Log in</button>
      </form>
    </div>
    
  );
}

export default LoginForm