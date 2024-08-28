"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select from "react-select";
import { useRouter, usePathname } from "next/navigation";
import "@fontsource/poppins";

const optionsTools = [
  { value: "/digitalSignature", label: "Digital Signature" },
  { value: "/qrcode", label: "QR Generator" },
  { value: "#", label: "XX" },
];

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
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentPath = pathname;
    setSelectedTool(
      optionsTools.find((option) => option.value === currentPath) || null
    );
    setSelectedAudio(
      optionsAudio.find((option) => option.value === currentPath) || null
    );
    setSelectedPDF(
      optionsPDF.find((option) => option.value === currentPath) || null
    );
    setLoading(false);
  }, [pathname]);

  const handleChange = (selectedOption, setFunction, resetFunctions) => {
    if (selectedOption && selectedOption.value !== pathname) {
      setFunction(selectedOption);
      resetFunctions.forEach((reset) => reset(null));
      if (selectedOption.value !== "#") {
        setLoading(true);
        router.push(selectedOption.value);
      }
    }
  };

  const handleHomeClick = () => {
    if (pathname !== "/") {
      setSelectedTool(null);
      setSelectedAudio(null);
      setSelectedPDF(null);
      setLoading(true);
      router.push("/");
    }
  };

  const selectStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f1f1f",
      borderRadius: "0.375rem",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      fontFamily: "Poppins, sans-serif",
      zIndex: 1000,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4a4a4a" : "#1f1f1f",
      fontFamily: "Poppins, sans-serif",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#333",
      },
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1f1f1f",
      fontFamily: "Poppins, sans-serif",
      border: "1px solid #333",
      color: "#fff",
      boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
      "&:hover": {
        borderColor: "#555",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
      fontFamily: "Poppins, sans-serif",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
      fontFamily: "Poppins, sans-serif",
    }),
  };

  return (
    <>
      <header className="relative bg-transparent text-white backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
          <Link
            href="/"
            className="flex sm:py-5 px-5 items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider drop-shadow-lg"
            onClick={handleHomeClick}
          >
            <img
              src="./mainlogo-color.png"
              alt="KwikTweaks"
              className="w-24 sm:w-32 md:w-36 lg:w-40 h-auto transform hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 mt-4 md:mt-0 relative z-10">
            <Select
              options={optionsTools}
              className="w-full sm:w-40 md:w-44 shadow-md z-50"
              classNamePrefix="select"
              placeholder="Utilities"
              value={selectedTool}
              onChange={(option) =>
                handleChange(option, setSelectedTool, [
                  setSelectedAudio,
                  setSelectedPDF,
                ])
              }
              styles={selectStyles}
            />
            <Select
              options={optionsAudio}
              className="w-full sm:w-40 md:w-44 shadow-md z-40"
              classNamePrefix="select"
              placeholder="Audio Tools"
              value={selectedAudio}
              onChange={(option) =>
                handleChange(option, setSelectedAudio, [
                  setSelectedTool,
                  setSelectedPDF,
                ])
              }
              styles={selectStyles}
            />
            <Select
              options={optionsPDF}
              className="w-full sm:w-40 md:w-44 shadow-md z-30"
              classNamePrefix="select"
              placeholder="PDF Tools"
              value={selectedPDF}
              onChange={(option) =>
                handleChange(option, setSelectedPDF, [
                  setSelectedTool,
                  setSelectedAudio,
                ])
              }
              styles={selectStyles}
            />
          </nav>
        </div>
        <div className="border-b-2 border-white opacity-50"></div>
      </header>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <img
            src="./logo.png"
            alt="loading"
            className="w-24 h-24 animate-spin"
          />
        </div>
      )}
    </>
  );
}
