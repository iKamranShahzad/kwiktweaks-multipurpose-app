export const metadata = {
  title: "KwikTweaks | Generate QR Code",
  description:
    "Easily generate QR codes for any text or URL. Customize the design, download the QR code, and use it for your needs.",
  keywords:
    "QR code, generate QR code, create QR code, QR code generator, customize QR code, download QR code, text to QR code, URL to QR code, Bar Code",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Generate QR Codes",
    description:
      "Easily generate QR codes for any text or URL. Customize the design, download the QR code, and use it for your needs.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/qrcode",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function QRCodeLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
