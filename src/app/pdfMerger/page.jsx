"use client";
import PdfMerger from "./PdfMerger";

export default function PdfMergerPage() {
  return (
    <div className="min-h-screen bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-neutral-200 mb-6 sm:mb-8">
          PDF Merger
        </h1>
        <PdfMerger />
      </div>
    </div>
  );
}
