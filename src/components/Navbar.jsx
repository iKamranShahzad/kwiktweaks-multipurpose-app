"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Select from "react-select";

export default function Navbar({ optionsTools, optionsAudio, optionsPDF }) {
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

  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const pathname = usePathname();

  const router = useRouter();

  const handleChange = (selectedOption, setFunction, resetFunctions) => {
    if (selectedOption && selectedOption.value !== pathname) {
      setFunction(selectedOption);
      resetFunctions.forEach((reset) => reset(null));
      if (selectedOption.value !== "#") {
        router.push(selectedOption.value);
      }
    }
  };

  const handleHomeClick = () => {
    if (pathname !== "/") {
      setSelectedTool(null);
      setSelectedAudio(null);
      setSelectedPDF(null);
      router.push("/");
    }
  };

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
  }, [pathname]);

  return (
    <>
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4 backdrop-blur-sm shadow-lg z-50">
        <Link
          href="/"
          className="flex sm:py-5 px-5 items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wider drop-shadow-lg"
          onClick={handleHomeClick}
        >
          <img
            src="./mainlogo-color.png"
            alt="KwikTweaks"
            className="w-52 h-auto sm:w-52 md:w-52 lg:w-64 transform hover:scale-110 transition-transform duration-300"
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
    </>
  );
}
