"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib"; // Import pdf-lib for client-side PDF operations
import LeftSection from "../../components/LeftSection";

export default function PdfSplitterPage() {
  const [splitFiles, setSplitFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.file.files[0];
    const startPage = parseInt(e.target.elements.startPage.value, 10);
    const endPage = parseInt(e.target.elements.endPage.value, 10);

    if (!fileInput) return;

    setLoading(true);

    try {
      const pdfDoc = await PDFDocument.load(await fileInput.arrayBuffer());
      const numberOfPages = pdfDoc.getPageCount();
      const pdfFiles = [];

      // Adjust start and end pages to be within bounds
      let startPageAdjusted = Math.max(0, startPage - 1);
      let endPageAdjusted = Math.min(endPage - 1, numberOfPages - 1);

      // Create PDF for the specified page range
      const rangePdfDoc = await PDFDocument.create();
      for (let i = startPageAdjusted; i <= endPageAdjusted; i++) {
        const [copiedPage] = await rangePdfDoc.copyPages(pdfDoc, [i]);
        rangePdfDoc.addPage(copiedPage);
      }
      const rangePdfBytes = await rangePdfDoc.save();
      pdfFiles.push({
        fileName: "specified-pages.pdf",
        fileUrl: URL.createObjectURL(
          new Blob([rangePdfBytes], { type: "application/pdf" })
        ),
      });

      // Create PDF for the remaining pages
      const remainingPdfDoc = await PDFDocument.create();
      for (let i = 0; i < numberOfPages; i++) {
        if (i < startPageAdjusted || i > endPageAdjusted) {
          const [copiedPage] = await remainingPdfDoc.copyPages(pdfDoc, [i]);
          remainingPdfDoc.addPage(copiedPage);
        }
      }
      const remainingPdfBytes = await remainingPdfDoc.save();
      pdfFiles.push({
        fileName: "remaining-pages.pdf",
        fileUrl: URL.createObjectURL(
          new Blob([remainingPdfBytes], { type: "application/pdf" })
        ),
      });

      setSplitFiles(pdfFiles);
    } catch (error) {
      console.error("Error processing PDF", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url, fileName) => {
    if (downloading) return;

    setDownloading(true);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object

    // Re-enable the button after 3 seconds
    setTimeout(() => setDownloading(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent md:flex-row">
      <LeftSection
        title="Split PDF Files"
        description="This tool allows you to split a PDF file into two parts based on the page numbers you specify. Upload your PDF, enter the start and end page numbers, and download the split PDFs."
      />
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-gray-700 bg-opacity-25 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h1
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="text-2xl font-semibold mb-4 text-white"
          >
            Upload and Split PDF
          </h1>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="mb-4">
              <label
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block text-white text-sm font-bold mb-2"
                htmlFor="file"
              >
                Upload PDF File
              </label>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                className="block w-full text-sm text-accent
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm hover:file:text-black
                file:bg-white-700 file:text-blue-900
                hover:file:bg-gray-300"
              />
            </div>
            <div className="mb-4">
              <label
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block text-white text-sm font-bold mb-2"
                htmlFor="startPage"
              >
                Start Page
              </label>
              <input
                type="number"
                name="startPage"
                placeholder="Start Page"
                min="1"
                className="block w-full text-sm text-black
                border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block text-white text-sm font-bold mb-2"
                htmlFor="endPage"
              >
                End Page
              </label>
              <input
                type="number"
                name="endPage"
                placeholder="End Page"
                min="1"
                className="block w-full text-sm text-black
                border border-gray-300 p-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              style={{ fontFamily: "Poppins, sans-serif" }}
              className={`bg-indigo-600 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Splitting..." : "Split PDF"}
            </button>
          </form>

          {splitFiles.length > 0 && (
            <div className="mt-6">
              <h2
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-xl font-semibold mb-4 text-white"
              >
                Download Split Files
              </h2>
              {splitFiles.length === 1 ? (
                <div className="flex items-center mb-2">
                  <button
                    onClick={() =>
                      handleDownload(
                        splitFiles[0].fileUrl,
                        splitFiles[0].fileName
                      )
                    }
                    className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg ${
                      downloading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={downloading}
                  >
                    Download {splitFiles[0].fileName}
                  </button>
                </div>
              ) : (
                splitFiles.map(({ fileName, fileUrl }) => (
                  <div key={fileName} className="flex items-center mb-2">
                    <button
                      onClick={() => handleDownload(fileUrl, fileName)}
                      className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg ${
                        downloading ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      disabled={downloading}
                    >
                      Download {fileName}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
