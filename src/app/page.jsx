import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <div className="text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 py-6 rounded-t-lg">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Welcome to KwikTweaks
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Enhance your productivity with our powerful tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 mr-3 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <h2 className="text-xl font-semibold text-white">Audio</h2>
            </div>
            <p className="text-base text-gray-400">
              Streamline your audio tasks with our advanced tools.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 mr-3 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-white">PDF</h2>
            </div>
            <p className="text-base text-gray-400">
              Effortlessly manage your PDF documents.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <svg
                className="w-8 h-8 mr-3 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-white">
                Digital Signature
              </h2>
            </div>
            <p className="text-base text-gray-400">
              Secure your documents with our digital signature tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
