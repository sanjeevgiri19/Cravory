import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} IXSN. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-sm hover:underline">
            About
          </a>
          <a href="#" className="text-sm hover:underline">
            Contact
          </a>
          <a href="#" className="text-sm hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
