export default function PdfPreview({ pdfUrl }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-6">
      <h2
        style={{ fontFamily: "Courier New, monospace" }}
        className="text-xl font-semibold text-gray-900 mb-4"
      >
        PDF Preview
      </h2>
      <div className="w-full h-[60vh] md:h-[80vh] relative">
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full rounded-md border border-gray-300"
          title="PDF Preview"
        />
      </div>
    </div>
  );
}
