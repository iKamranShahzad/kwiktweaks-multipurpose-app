"use client";
import React from "react";
import Link from "next/link";
import Select from "react-select";

const optionsAudio = [
  { value: "/audiotrim", label: "Trim MP3" },
  { value: "/adjustspeed", label: "Adjust Speed" },
  { value: "#", label: "Suboption 3" },
];

const optionsPDF = [
  { value: "#", label: "Suboption 1" },
  { value: "#", label: "Suboption 2" },
  { value: "#", label: "Suboption 3" },
];

export default function Header() {
  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex flex-row justify-between items-center p-4">
        <Link href="/" className="text-3xl font-extrabold tracking-wider">
          <img
            src="/mainlogowhite.png"
            alt="KwikTweaks"
            className="w-36 h-auto transform hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <nav className="flex space-x-6">
          <Link
            href="/digitalSignature"
            className="block px-5 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Digital Signature
          </Link>

          {/* Audio Tools Dropdown */}
          <Select
            options={optionsAudio}
            className="w-40"
            classNamePrefix="select"
            placeholder="Audio Tools"
            menuPlacement="bottom"
            styles={{
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#1f1f1f",
                borderRadius: "0.375rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#4a4a4a" : "#1f1f1f",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
                "&:hover": {
                  borderColor: "#555",
                },
              }),
            }}
            onChange={(selectedOption) =>
              (window.location.href = selectedOption.value)
            }
          />

          {/* PDF Tools Dropdown */}
          <Select
            options={optionsPDF}
            className="w-40"
            classNamePrefix="select"
            placeholder="PDF Tools"
            menuPlacement="bottom"
            styles={{
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#1f1f1f",
                borderRadius: "0.375rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#4a4a4a" : "#1f1f1f",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
                "&:hover": {
                  borderColor: "#555",
                },
              }),
            }}
            onChange={(selectedOption) =>
              (window.location.href = selectedOption.value)
            }
          />
        </nav>
      </div>
    </header>
  );
}
