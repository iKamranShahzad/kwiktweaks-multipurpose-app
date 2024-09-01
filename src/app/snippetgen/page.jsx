"use client";
import CodeEditor from "../../components/CodeEditor";

export default function SnippetGen() {
  return (
    <>
      <div className="w-full p-4 md:p-6 bg-transparent text-white shadow-lg flex flex-col justify-center">
        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Code Snippet Screenshot Generator
        </h2>
        <p
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-base md:text-lg"
        >
          Generate beautiful screenshots of your code snippets with ease.
        </p>
      </div>
      <div className="w-full h-full p-4 md:p-6">
        <div className="bg-gray-700 bg-opacity-25 p-4 md:p-6 rounded-lg shadow-lg w-full">
          <CodeEditor />
        </div>
      </div>
    </>
  );
}
