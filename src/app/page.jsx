import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-black p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Welcome to KwikTweaks!
          </h2>
          <p className="text-base sm:text-lg mb-4">
            KwikTweaks is a multipurpose app designed to enhance your
            productivity. Currently, we offer tools for:
          </p>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li className="text-base sm:text-lg">Audio</li>
            <li className="text-base sm:text-lg">PDF</li>
            <li className="text-base sm:text-lg">Digital Signature</li>
          </ul>
        </div>
      </div>
    </>
  );
}
