import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <span className="text-muted">
          &copy; {new Date().getFullYear()} Travelogue. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;