export const metadata = {
  title: "KwikTweaks | Split PDF Files",
  description:
    "Easily split a single PDF file into multiple documents. Upload your PDF, select the pages you want to extract, and download the split files effortlessly.",
  keywords:
    "split PDF, divide PDF files, PDF splitter, extract pages from PDF, PDF tools, document splitting, download split PDF",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Split PDF Files",
    description:
      "Easily split a single PDF file into multiple documents. Upload your PDF, select the pages you want to extract, and download the split files effortlessly.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/split-pdf",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function SplitPDFLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
