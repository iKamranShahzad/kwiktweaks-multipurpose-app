import React from "react";

// Example of how to include Google Font (replace with actual font if needed)
// import '@fontsource/courier-new';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary p-4">
      <main className="w-full flex flex-col items-center max-w-5xl">
        <div className="flex flex-col md:flex-row w-full mb-8">
          <div className="bg-secondary text-accent p-8 rounded-3xl flex-1 mb-4 md:mb-0 md:mr-4">
            <h1
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              KwikTweaks
            </h1>
            <p
              className="text-accent"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Elevate your productivity with KwikTweaks. A comprehensive suite
              of tools designed to simplify tasks like audio editing, PDF
              management, and digital signatures.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
          <div className="bg-secondary p-6 rounded-2xl">
            <h2
              className="text-accent font-bold text-lg"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Audio Editing
            </h2>
            <p
              className="text-accent"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Refine and optimize your audio files with ease.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-2xl">
            <h2
              className="text-accent font-bold text-lg"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              PDF Tools
            </h2>
            <p
              className="text-accent"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Manage your PDF documents efficiently.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-2xl">
            <h2
              className="text-accent font-bold text-lg"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Digital Signatures
            </h2>
            <p
              className="text-accent"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Securely sign your documents online.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
