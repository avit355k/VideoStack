// ./frontend/src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Footer links array for important pages
  const footerLinks = [
    { title: "Home", link: "/" },
    { title: "CD", link: "/CD" },
    { title: "DVD", link: "/DVD" },
    { title: "Store Info", link: "/Store Info" },
  ];

  return (
    <footer className="flex flex-col items-center justify-center p-6 bg-zinc-800 text-slate-200">
      <div className="flex items-center gap-6 mb-4">
        {/* Footer links */}
        {footerLinks.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="hover:text-sky-500 transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <p className="text-center text-xs md:text-sm">
        &copy; {new Date().getFullYear()} VideoStack. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
