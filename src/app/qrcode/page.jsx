// src/components/QRCodeGenerator.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const BarcodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [barcodeType, setBarcodeType] = useState("QR Code"); // Default to 2D QR Code
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const barcodeRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBarcodeTypeChange = (event) => {
    setBarcodeType(event.target.value);
    setBarcodeUrl(""); // Clear the barcode when type changes
  };

  const handleGenerateClick = async () => {
    if (inputValue.trim()) {
      try {
        if (barcodeType === "QR Code") {
          // Generate a QR Code
          const url = await QRCode.toDataURL(inputValue);
          setBarcodeUrl(url);
        } else if (barcodeType === "Code 128") {
          // Generate a Code 128 barcode
          JsBarcode(barcodeRef.current, inputValue, {
            format: "code128",
            displayValue: true,
            lineColor: "#000000",
            width: 2,
            height: 100,
            margin: 10,
            textAlign: "center",
            fontSize: 20,
          });
          setBarcodeUrl(barcodeRef.current.toDataURL("image/png"));
        }
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
  };

  useEffect(() => {
    if (barcodeType === "Code 128" && inputValue) {
      handleGenerateClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeType]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent md:flex-row">
      <div className="w-full md:w-1/3 p-4 md:p-6 bg-transparent text-white shadow-lg flex flex-col justify-center">
        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Barcode Generator
        </h2>
        <p
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-base md:text-lg"
        >
          Enter any text or URL to generate a barcode. You can select between
          generating a 1D barcode (like Code 128) or a 2D barcode (QR Code).
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-gray-700 bg-opacity-25 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <label
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="barcode-input"
            >
              Enter Text or URL
            </label>
            <input
              type="text"
              id="barcode-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter text or URL"
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block w-full text-sm text-black border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="barcode-type"
            >
              Select Barcode Type
            </label>
            <select
              id="barcode-type"
              value={barcodeType}
              onChange={handleBarcodeTypeChange}
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block w-full text-sm text-black border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="QR Code">QR Code (2D)</option>
              <option value="Code 128">Code 128 (1D)</option>
            </select>
          </div>
          <button
            onClick={handleGenerateClick}
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="bg-indigo-600 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-outline mb-4"
          >
            Generate Barcode
          </button>
          {barcodeType === "Code 128" && (
            <canvas ref={barcodeRef} style={{ display: "none" }} />
          )}
          {barcodeUrl && (
            <div className="flex flex-col items-center">
              <img
                src={barcodeUrl}
                alt="Generated Barcode"
                className="border border-gray-300 p-4 rounded-lg mb-4"
              />
              <a
                href={barcodeUrl}
                download="barcode.png"
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="bg-neutral-300 hover:bg-green-600 text-black py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
              >
                Download Barcode
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
