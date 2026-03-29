import React from "react";

const Footer = () => {
  return (
    <footer className=" border-t

      bg-white border-gray-200
      dark:bg-gray-900 dark:border-gray-800
    ">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">

              {/* Logo */}
              <div className="
                w-11 h-11 rounded-xl flex items-center justify-center shadow-md

                bg-gradient-to-br from-purple-200 to-blue-300
                dark:from-purple-500 dark:to-blue-500
              ">
                <img src="/favicon.png" className="w-8 h-8" />
              </div>

              {/* Name */}
              <div>
                <h2 className="
                  font-semibold text-lg 
                  bg-gradient-to-r from-purple-600 to-blue-500 
                  bg-clip-text text-transparent
                ">
                  Nexus
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Simple task & team management
                </p>
              </div>

            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-5">
              Built with care ✨ © {new Date().getFullYear()} Nexus Inc.  
              All rights reserved.
            </p>
          </div>

          {/* Spacer / Future Links */}
          <div className="hidden md:block"></div>

          {/* Optional Socials (clean minimal) */}
          <div className="flex md:justify-end items-start gap-3">

            <div className="
              w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition

              bg-gray-100 hover:bg-purple-100
              dark:bg-gray-800 dark:hover:bg-purple-600
            ">
              🌐
            </div>

            <div className="
              w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition

              bg-gray-100 hover:bg-blue-100
              dark:bg-gray-800 dark:hover:bg-blue-600
            ">
              🐦
            </div>

            <div className="
              w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition

              bg-gray-100 hover:bg-pink-100
              dark:bg-gray-800 dark:hover:bg-pink-600
            ">
              📸
            </div>

          </div>

        </div>

        {/* Bottom Line */}
        <div className="
          border-t mt-10 pt-6 text-center text-xs

          text-gray-400 border-gray-200
          dark:border-gray-800 dark:text-gray-500
        ">
          Made with ❤️ using modern web technologies
        </div>

      </div>
    </footer>
  );
};

export default Footer;