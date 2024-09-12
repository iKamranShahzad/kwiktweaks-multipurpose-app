import { PDFDocument } from "pdf-lib";

export async function splitPdf(file, startPage, endPage) {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
  const numberOfPages = pdfDoc.getPageCount();
  const pdfFiles = [];

  // Adjust start and end pages to be within bounds
  startPage = Math.max(0, startPage);
  endPage = Math.min(endPage, numberOfPages - 1);

  // Create PDF for the specified page range
  const rangePdfDoc = await PDFDocument.create();
  for (let i = startPage; i <= endPage; i++) {
    const [copiedPage] = await rangePdfDoc.copyPages(pdfDoc, [i]);
    rangePdfDoc.addPage(copiedPage);
  }
  const rangePdfBytes = await rangePdfDoc.save();
  pdfFiles.push(new Blob([rangePdfBytes], { type: "application/pdf" }));

  // Create PDF for the remaining pages
  const remainingPdfDoc = await PDFDocument.create();
  for (let i = 0; i < numberOfPages; i++) {
    if (i < startPage || i > endPage) {
      const [copiedPage] = await remainingPdfDoc.copyPages(pdfDoc, [i]);
      remainingPdfDoc.addPage(copiedPage);
    }
  }
  const remainingPdfBytes = await remainingPdfDoc.save();
  pdfFiles.push(new Blob([remainingPdfBytes], { type: "application/pdf" }));

  return pdfFiles; // Returns an array of two split PDF files (as Blob objects)
}
