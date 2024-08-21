"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import { useRouter, usePathname } from "next/navigation";

const optionsAudio = [
  { value: "/audiotrim", label: "Trim MP3" },
  { value: "/adjustspeed", label: "Adjust Speed" },
  { value: "/mergeaudio", label: "Merge Audio" },
];

const optionsPDF = [
  { value: "/pdfMerger", label: "Merge PDFs" },
  { value: "#", label: "Suboption 2" },
  { value: "#", label: "Suboption 3" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset dropdowns based on pathname
    if (pathname.startsWith("/digitalSignature")) {
      setSelectedAudio(null);
      setSelectedPDF(null);
    } else if (
      pathname.startsWith("/audiotrim") ||
      pathname.startsWith("/adjustspeed") ||
      pathname.startsWith("/mergeaudio")
    ) {
      setSelectedPDF(null);
    } else if (
      pathname.startsWith("/pdfMerger") ||
      pathname.startsWith("/pdfSuboption2") ||
      pathname.startsWith("/pdfSuboption3")
    ) {
      setSelectedAudio(null);
    }
    setLoading(false); // Set loading to false after initial load
  }, [pathname]);

  const handleAudioChange = (selectedOption) => {
    setSelectedAudio(selectedOption);
    if (selectedOption && selectedOption.value !== "#") {
      setLoading(true); // Set loading to true when navigating to a new page
      router.push(selectedOption.value);
    }
  };

  const handlePDFChange = (selectedOption) => {
    setSelectedPDF(selectedOption);
    if (selectedOption && selectedOption.value !== "#") {
      setLoading(true); // Set loading to true when navigating to a new page
      router.push(selectedOption.value);
    }
  };

  const handleHomeClick = () => {
    if (pathname !== "/") {
      setSelectedAudio(null);
      setSelectedPDF(null);
      setLoading(true); // Set loading to true only if not already on the homepage
      router.push("/");
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-slate-950 text-white shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wider flex-shrink-0"
          onClick={handleHomeClick}
        >
          <img
            src="./mainlogo.png"
            alt="KwikTweaks"
            className="w-36 h-auto transform hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
          <Link
            href="/digitalSignature"
            className="block px-4 py-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105 text-center"
          >
            Digital Signature
          </Link>

          {/* Audio Tools Dropdown */}
          <Select
            options={optionsAudio}
            className="w-full md:w-44"
            classNamePrefix="select"
            placeholder="Audio Tools"
            menuPlacement="bottom"
            value={selectedAudio}
            onChange={handleAudioChange}
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
              placeholder: (provided) => ({
                ...provided,
                color: "#888",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
            }}
          />

          {/* PDF Tools Dropdown */}
          <Select
            options={optionsPDF}
            className="w-full md:w-44"
            classNamePrefix="select"
            placeholder="PDF Tools"
            menuPlacement="bottom"
            value={selectedPDF}
            onChange={handlePDFChange}
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
              placeholder: (provided) => ({
                ...provided,
                color: "#888",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fff",
              }),
            }}
          />
        </nav>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <img
            src="./logo.png"
            alt="loading"
            className="w-24 h-24 animate-spin"
          />
        </div>
      )}
    </header>
  );
}
