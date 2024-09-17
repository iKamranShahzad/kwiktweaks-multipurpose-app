"use client";

import { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import LeftSection from "../../components/LeftSection"; // Ensure you have this component or its path is correct

export default function PdfWatermarkTool() {
  const [file, setFile] = useState(null);
  const [watermark, setWatermark] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleWatermarkChange = (event) => {
    setWatermark(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    // Read the file as an ArrayBuffer
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async () => {
      const pdfBytes = fileReader.result;

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // Determine the watermark size and position
      const watermarkSize = watermark.length > 18 ? 40 : 45;

      // Add watermark to each page
      for (const page of pages) {
        const { width, height } = page.getSize();
        const xPosition = watermark.length > 18 ? width / 4 : width / 3;
        const yPosition = watermark.length > 18 ? height / 4 : height / 2.5;

        page.drawText(watermark, {
          x: xPosition,
          y: yPosition,
          size: watermarkSize,
          color: rgb(0.75, 0.75, 0.75),
          opacity: 0.5,
          rotate: degrees(50),
        });
      }

      // Serialize the PDF to bytes
      const modifiedPdfBytes = await pdfDoc.save();

      // Create a downloadable link
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent md:flex-row">
      <LeftSection
        title="Add Watermark to PDF"
        description="This tool allows you to add a watermark to your PDF file. Upload your PDF and enter the watermark text."
      />
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-gray-700 bg-opacity-25 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block text-accent text-sm font-bold mb-2"
                htmlFor="file"
              >
                Upload PDF
              </label>
              <input
                type="file"
                id="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block w-full text-sm text-accent
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm hover:file:text-black
                file:bg-white-700 file:text-blue-900
                hover:file:bg-gray-300
              "
              />
            </div>
            <div className="mb-4">
              <label
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block text-accent text-sm font-bold mb-2"
                htmlFor="watermark"
              >
                Watermark Text
              </label>
              <input
                type="text"
                id="watermark"
                value={watermark}
                onChange={handleWatermarkChange}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block w-full text-sm text-black
                p-2 border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                hover:bg-gray-100
              "
              />
            </div>
            <button
              type="submit"
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="bg-indigo-600 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-outline"
            >
              Add Watermark
            </button>
          </form>
          {downloadLink && (
            <div className="mt-6">
              <h3
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-xl font-bold mb-2 text-accent"
              >
                Download Watermarked PDF
              </h3>
              <a
                href={downloadLink}
                download="watermarked.pdf"
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="bg-neutral-300 hover:bg-green-600 text-black py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 mt-4 inline-block"
              >
                Download Watermarked PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
