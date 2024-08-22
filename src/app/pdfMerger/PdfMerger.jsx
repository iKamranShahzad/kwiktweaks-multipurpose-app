import { useState, lazy, Suspense } from "react";
import { PDFDocument } from "pdf-lib";

const PdfPreview = lazy(() => import("./PdfPreview"));

export default function PdfMerger() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFiles([...e.target.files]);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newFiles = [...pdfFiles];
    [newFiles[index - 1], newFiles[index]] = [
      newFiles[index],
      newFiles[index - 1],
    ];
    setPdfFiles(newFiles);
  };

  const handleMoveDown = (index) => {
    if (index === pdfFiles.length - 1) return;
    const newFiles = [...pdfFiles];
    [newFiles[index], newFiles[index + 1]] = [
      newFiles[index + 1],
      newFiles[index],
    ];
    setPdfFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (pdfFiles.length === 0) return;
    setIsLoading(true);
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    setMergedPdfUrl(URL.createObjectURL(blob));
    setIsLoading(false);
  };

  const downloadMergedPdf = () => {
    if (mergedPdfUrl) {
      const link = document.createElement("a");
      link.href = mergedPdfUrl;
      link.download = "merged.pdf";
      link.click();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/3 p-4 md:p-6 bg-primary text-white shadow-lg flex flex-col justify-center">
        <h2
          style={{ fontFamily: "Courier New, monospace" }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          PDF Merger
        </h2>
        <p
          style={{ fontFamily: "Courier New, monospace" }}
          className="text-base md:text-lg"
        >
          Merge multiple PDF files into one. Upload your PDFs, reorder them as
          needed, and merge them with a click.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-secondary p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <label
              style={{ fontFamily: "Courier New, monospace" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="pdf-upload"
            >
              Select PDF files to merge
            </label>
            <input
              id="pdf-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf"
              style={{ fontFamily: "Courier New, monospace" }}
              className="block w-full text-sm text-accent
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-800 file:text-accent
              hover:file:bg-gray-600
            "
            />
          </div>
          {pdfFiles.length > 0 && (
            <div className="mb-4">
              <h3
                style={{ fontFamily: "Courier New, monospace" }}
                className="text-lg font-semibold mb-2 text-accent"
              >
                Reorder PDF files
              </h3>
              <div className="space-y-2">
                {pdfFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-accent rounded-md p-3"
                  >
                    <span
                      style={{ fontFamily: "Courier New, monospace" }}
                      className="text-primary font-bold"
                    >
                      {file.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleMoveUp(index)}
                        style={{ fontFamily: "Courier New, monospace" }}
                        className="px-2 py-1 bg-primary text-white rounded hover:bg-green-900 disabled:bg-gray-600"
                        disabled={index === 0}
                      >
                        Up
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        style={{ fontFamily: "Courier New, monospace" }}
                        className="px-2 py-1 bg-primary text-white rounded hover:bg-green-900 disabled:bg-gray-600"
                        disabled={index === pdfFiles.length - 1}
                      >
                        Down
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mb-6 mt-4">
            <button
              onClick={mergePdfs}
              style={{ fontFamily: "Courier New, monospace" }}
              disabled={pdfFiles.length === 0 || isLoading}
              className={`px-4 py-2 rounded-md text-white font-bold transition-all duration-300 ${
                pdfFiles.length === 0 || isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary hover:bg-green-900"
              }`}
            >
              {isLoading ? "Merging..." : "Merge PDFs"}
            </button>
            {mergedPdfUrl && (
              <button
                onClick={downloadMergedPdf}
                style={{ fontFamily: "Courier New, monospace" }}
                className="px-4 py-2 bg-primary hover:bg-purple-900 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
              >
                Download Merged PDF
              </button>
            )}
          </div>
          {mergedPdfUrl && (
            <Suspense
              fallback={
                <div className="text-center py-10 text-accent">
                  Loading preview...
                </div>
              }
            >
              <PdfPreview pdfUrl={mergedPdfUrl} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
