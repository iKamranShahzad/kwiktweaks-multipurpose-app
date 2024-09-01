import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  solarizedlight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Moon, Sun, Copy, Download } from "lucide-react";
import { motion } from "framer-motion";
import ExportButton from "./ExportButton";

const CodeEditor = () => {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dark");

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Textarea Section */}
      <div className="w-full lg:w-1/3 p-4">
        <div className="mb-4">
          <label
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="block text-accent text-sm font-bold mb-2"
            htmlFor="language-select"
          >
            Select Language
          </label>
          <select
            id="language-select"
            className="block w-full text-sm text-black border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="typescript">TypeScript</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="go">Go</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            {/* Add more language options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="block text-accent text-sm font-bold mb-2"
            htmlFor="code-editor"
          >
            Enter Your Code
          </label>
          <textarea
            id="code-editor"
            className="block w-full text-sm text-black border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </div>

      {/* Code Preview Section */}
      <div className="w-full lg:w-2/3 p-4 flex flex-col">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <motion.button
            onClick={toggleTheme}
            title="Toggle Theme"
            className="text-xl p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-300" />
            )}
          </motion.button>
          <div className="flex flex-wrap space-x-4 space-y-2 lg:space-y-0">
            <ExportButton className="text-xl" />
            <motion.button
              onClick={handleCopy}
              title="Copy Code"
              className="text-xl p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Copy className="text-green-400" />
            </motion.button>
            <motion.button
              onClick={handleDownload}
              title="Download Code"
              className="text-xl p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="text-blue-400" />
            </motion.button>
          </div>
        </div>

        <div
          id="code-container"
          className={`flex-1 m-4 p-4 lg:p-10 ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-black"
          } rounded-lg relative border border-gray-300 overflow-auto`}
        >
          <div className="absolute top-2 left-2 flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <SyntaxHighlighter
            language={language}
            style={theme === "dark" ? tomorrow : solarizedlight}
            showLineNumbers
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
