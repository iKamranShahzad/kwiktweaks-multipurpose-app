import Header from "@/components/MainHeader";
import "./globals.css";

export const metadata = {
  title: "KwikTweaks",
  description: "A Multipurpose Webapp.",
  keywords:
    "audio, speed, adjust, modify, change, increase, decrease, preview, download, pdf, merge, signature, qr, barcode",
  author: "Kamran Shahzad",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - A Multipurpose Webapp",
    description: "A Multipurpose Webapp.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app",
    type: "website",
    images: [
      {
        url: "/public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen p-4 loading-background">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
