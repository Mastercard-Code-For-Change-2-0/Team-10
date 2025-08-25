import React from 'react';
import { Link } from "react-router-dom";

function SignupForm() {
  return (
    <div className="form-section">
      <h2>Create an account</h2>
      <p className="login-link">
        Already have an account? <Link to="/Login">Log in</Link>
      </p>
      <form>
        <input type="text" placeholder="Full name" required />
        <input type="text" placeholder="Organisation name" required />

        {/* Dropdown for role */}
        <select required style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
            <option value="">Select your role</option>
            <option value="founder">Founder</option>
            <option value="manager">Manager</option>
          <option value="employee">Employee</option>
          <option value="volunteer">Volunteer</option>
          <option value="other">Other</option>
</select>


        <input type="email" placeholder="Organisation Email" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit" className="submit-button">Create account</button>
      </form>

      <div className="social-login">
        <button className="google">Sign up with Google</button>
      </div>
    </div>
  );
}

export default SignupForm;
