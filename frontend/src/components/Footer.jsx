import React from "react";

// Thêm biểu tượng cho các logo (Facebook, Line, LinkedIn)
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { SiLine } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#2e3033] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <ul>
              <li><a href="#" className="text-lg hover:underline">About Us</a></li>
              <li><a href="#" className="text-lg hover:underline">Careers</a></li>
              <li><a href="#" className="text-lg hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Support</h3>
            <ul>
              <li><a href="#" className="text-lg hover:underline">Help Center</a></li>
              <li><a href="#" className="text-lg hover:underline">FAQ</a></li>
              <li><a href="#" className="text-lg hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4 items-center">
              <a href="#" className="flex items-center text-lg hover:underline">
                <FaFacebookF className="text-blue-600 mr-2" /> Facebook
              </a>
              <a href="#" className="flex items-center text-lg hover:underline">
                <SiLine className="text-green-500 mr-2" /> Line
              </a>
              <a href="#" className="flex items-center text-lg hover:underline">
                <FaLinkedinIn className="text-blue-700 mr-2" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white pt-6 text-center">
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
