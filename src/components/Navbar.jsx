"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar({ optionsTools, optionsAudio, optionsPDF }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const [toolsOpen, setToolsOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);

  const toolsRef = useRef(null);
  const audioRef = useRef(null);
  const pdfRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
      if (audioRef.current && !audioRef.current.contains(event.target)) {
        setAudioOpen(false);
      }
      if (pdfRef.current && !pdfRef.current.contains(event.target)) {
        setPdfOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option, setFunction, resetFunctions, closeDropdown) => {
    if (option && option.value !== pathname) {
      setFunction(option);
      resetFunctions.forEach((reset) => reset(null));
      if (option.value !== "#") {
        router.push(option.value);
      }
    }
    closeDropdown(false);
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
  }, [pathname, optionsTools, optionsAudio, optionsPDF]);

  // Custom dropdown component
  const CustomDropdown = ({
    options,
    placeholder,
    selectedOption,
    isOpen,
    setIsOpen,
    onSelect,
    dropdownRef,
  }) => {
    return (
      <div ref={dropdownRef} className="relative w-full sm:w-40 md:w-44 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 flex justify-between items-center bg-[#1f1f1f] border border-[#333] rounded text-white shadow-md hover:border-[#555] transition-colors"
        >
          <span
            className={`font-poppins ${!selectedOption ? "text-[#888]" : ""}`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute w-full mt-1 rounded-md bg-[#1f1f1f] border border-[#333] shadow-lg max-h-60 overflow-auto z-50">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => onSelect(option)}
                className={`px-3 py-2 cursor-pointer hover:bg-[#333] ${
                  selectedOption && selectedOption.value === option.value
                    ? "bg-[#4a4a4a]"
                    : ""
                }`}
              >
                <span className="text-white font-poppins">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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
          <CustomDropdown
            options={optionsTools}
            placeholder="Utilities"
            selectedOption={selectedTool}
            isOpen={toolsOpen}
            setIsOpen={setToolsOpen}
            dropdownRef={toolsRef}
            onSelect={(option) =>
              handleSelect(
                option,
                setSelectedTool,
                [setSelectedAudio, setSelectedPDF],
                setToolsOpen
              )
            }
          />

          <CustomDropdown
            options={optionsAudio}
            placeholder="Audio Tools"
            selectedOption={selectedAudio}
            isOpen={audioOpen}
            setIsOpen={setAudioOpen}
            dropdownRef={audioRef}
            onSelect={(option) =>
              handleSelect(
                option,
                setSelectedAudio,
                [setSelectedTool, setSelectedPDF],
                setAudioOpen
              )
            }
          />

          <CustomDropdown
            options={optionsPDF}
            placeholder="PDF Tools"
            selectedOption={selectedPDF}
            isOpen={pdfOpen}
            setIsOpen={setPdfOpen}
            dropdownRef={pdfRef}
            onSelect={(option) =>
              handleSelect(
                option,
                setSelectedPDF,
                [setSelectedTool, setSelectedAudio],
                setPdfOpen
              )
            }
          />
        </nav>
      </div>
      <div className="border-b-2 border-white opacity-50"></div>
    </>
  );
}
