export const metadata = {
  title: "KwikTweaks | Add Watermark to PDF",
  description:
    "Easily add a watermark to your PDF files. Upload your PDF, enter your watermark text, and download the watermarked document effortlessly.",
  keywords:
    "add watermark to PDF, PDF watermark tool, watermark PDF files, PDF tools, document watermarking, PDF editing",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Add Watermark to PDF",
    description:
      "Easily add a watermark to your PDF files. Upload your PDF, enter your watermark text, and download the watermarked document effortlessly.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/watermark-pdf",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function WatermarkPDFLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
