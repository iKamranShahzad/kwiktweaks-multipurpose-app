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
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <label
          htmlFor="pdf-upload"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Select PDF files to merge
        </label>
        <input
          id="pdf-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          className="block w-full text-sm text-gray-800
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </div>
      {pdfFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Reorder PDF files
          </h3>
          <div className="space-y-2">
            {pdfFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 rounded-md p-3"
              >
                <span className="text-gray-800">{file.name}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleMoveUp(index)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
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
          disabled={pdfFiles.length === 0 || isLoading}
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            pdfFiles.length === 0 || isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Merging..." : "Merge PDFs"}
        </button>
        {mergedPdfUrl && (
          <button
            onClick={downloadMergedPdf}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Download Merged PDF
          </button>
        )}
      </div>
      {mergedPdfUrl && (
        <Suspense
          fallback={
            <div className="text-center py-10 text-gray-800">
              Loading preview...
            </div>
          }
        >
          <PdfPreview pdfUrl={mergedPdfUrl} />
        </Suspense>
      )}
    </div>
  );
}
