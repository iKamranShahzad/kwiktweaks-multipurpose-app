import Header from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "KwikTweaks - WebApp",
  description: "A Multipurpose WebApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
