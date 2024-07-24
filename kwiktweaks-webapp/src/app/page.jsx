import React from "react";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-black p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4">Welcome to KwikTweaks!</h2>
          <p className="text-lg">
            KwikTweaks is a multipurpose app designed to enhance your
            productivity. Currently, we offer tools for:
          </p>
          <ul className="mt-4 list-disc list-inside">
            <li className="text-lg">Audio</li>
            <li className="text-lg">PDF</li>
            <li className="text-lg">Digital Signature</li>
          </ul>
        </div>
      </div>
    </>
  );
}
