import './Footer.css'; // Make sure to create this CSS file

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo-section">
          <div className="logo-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="logo-text">Seva Sahayog</span>
          <p className="footer-description">
            Your contribution can make a difference by creating better living conditions for the people living in the slums.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>About</h3>
            <ul>
              <li><a href="/about">Who We Are</a></li>
              <li><a href="/mission">Our Mission</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/impact">Impact Stories</a></li>
            </ul>
          </div>
          <div>
            <h3>Get Involved</h3>
            <ul>
              <li><a href="/volunteer">Volunteer</a></li>
              <li><a href="/donate">Donate</a></li>
              <li><a href="/partner">Partnerships</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Seva Sahayog — All Rights Reserved</p>
        <div className="social-icons">
          <a href="#" title="Facebook">📘</a>
          <a href="#" title="Twitter">🐦</a>
          <a href="#" title="Instagram">📸</a>
          <a href="#" title="LinkedIn">💼</a>
        </div>
      </div>
    </footer>
  );
}