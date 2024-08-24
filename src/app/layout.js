import Header from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "KwikTweaks - WebApp",
  description: "A Multipurpose WebApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
        style={{ backgroundImage: "url('./trianglesg.svg')" }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
