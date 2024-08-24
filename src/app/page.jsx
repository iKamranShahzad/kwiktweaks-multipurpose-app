import React from "react";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Added top padding to start below the header */}
      <main className="w-full flex flex-col items-center max-w-5xl bg-gray-900 bg-opacity-50 text-white p-8 rounded-3xl shadow-lg backdrop-blur-md mx-auto">
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-extrabold mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            KwikTweaks
          </h1>
          <p
            className="text-lg text-gray-300"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Elevate your productivity with our suite of tools designed for audio
            editing, PDF management, and digital signatures.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="p-8 rounded-xl bg-gray-800 shadow-lg hover:bg-gray-700 transition-all flex flex-col items-center">
            <svg
              className="w-16 h-16 text-blue-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              ></path>
            </svg>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Audio Editing
            </h2>
            <p
              className="text-gray-400 text-center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Refine and optimize your audio files with ease.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-gray-800 shadow-lg hover:bg-gray-700 transition-all flex flex-col items-center">
            <svg
              className="w-16 h-16 text-green-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              PDF Tools
            </h2>
            <p
              className="text-gray-400 text-center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Manage your PDF documents efficiently.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-gray-800 shadow-lg hover:bg-gray-700 transition-all flex flex-col items-center">
            <svg
              className="w-16 h-16 text-yellow-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Digital Signatures
            </h2>
            <p
              className="text-gray-400 text-center"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Securely sign your documents online.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
