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
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <label
          htmlFor="pdf-upload"
          className="block text-lg font-medium text-gray-700 mb-3"
        >
          Select PDF files to merge
        </label>
        <input
          id="pdf-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-3 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
        <button
          onClick={mergePdfs}
          disabled={pdfFiles.length === 0 || isLoading}
          className={`w-full lg:w-auto px-6 py-3 text-lg rounded-md font-semibold ${
            pdfFiles.length === 0 || isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isLoading ? "Merging..." : "Merge PDFs"}
        </button>
        {mergedPdfUrl && (
          <button
            onClick={downloadMergedPdf}
            className="w-full lg:w-auto px-6 py-3 text-lg bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Download Merged PDF
          </button>
        )}
      </div>
      {mergedPdfUrl && (
        <Suspense
          fallback={<div className="text-center py-10">Loading preview...</div>}
        >
          <PdfPreview pdfUrl={mergedPdfUrl} />
        </Suspense>
      )}
    </div>
  );
}
