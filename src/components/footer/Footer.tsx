import * as React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky-footer">
      <div className="container">
        <div className="text-center">
          <small>Copyright © Amir Karamuja {currentYear}</small>
        </div>
      </div>
    </footer>
  );
}
