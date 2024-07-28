import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto flex flex-row justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          <img src="/mainlogowhite.png" alt="KwikTweaks" className="w-1/3" />
        </Link>
        <nav className="flex space-x-4">
          <div className="relative group">
            <Link
              href="/digitalSignature"
              className="block px-4 py-2 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
            >
              Digital Signature
            </Link>
          </div>
          <div className="relative group">
            <button className="py-2 px-4 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105">
              Audio Tools
            </button>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white shadow-lg py-2 transition-all duration-300 transform scale-95 group-hover:scale-100">
              <Link
                href="/audiotrim"
                className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
              >
                Trim MP3
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
              >
                Suboption 2
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
              >
                Suboption 3
              </Link>
            </div>
          </div>
          <div className="relative group">
            <button className="py-2 px-4 hover:bg-gray-600 transition-all duration-300 transform hover:scale-105">
              PDF Tools
            </button>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white shadow-lg py-2 transition-all duration-300 transform scale-95 group-hover:scale-100">
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
              >
                Suboption 1
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
              >
                Suboption 2
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-300"
              >
                Suboption 3
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
