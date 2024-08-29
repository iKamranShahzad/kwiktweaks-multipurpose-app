export const metadata = {
  title: "KwikTweaks | Merge PDF Files",
  description:
    "Easily merge multiple PDF files into a single document. Upload your PDFs, combine them, and download the merged file effortlessly.",
  keywords:
    "merge PDF, combine PDF files, PDF merger, join PDFs, PDF tools, document merging, download merged PDF",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Merge PDF Files",
    description:
      "Easily merge multiple PDF files into a single document. Upload your PDFs, combine them, and download the merged file effortlessly.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/pdfMerger",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function MergePDFLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
