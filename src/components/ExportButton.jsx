import React from "react";
import html2canvas from "html2canvas";

const ExportButton = () => {
  const handleExport = async () => {
    // Target the element with the unique ID
    const element = document.querySelector("#code-container");
    if (element) {
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "code-screenshot.png";
      link.click();
    }
  };

  return (
    <button
      className="bg-neutral-300 hover:bg-green-600 text-black py-2 px-4 sm:py-3 sm:px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
      onClick={handleExport}
    >
      <span className="hidden sm:inline">Export Screenshot</span>
      <span className="inline sm:hidden">Export</span>
    </button>
  );
};

export default ExportButton;
