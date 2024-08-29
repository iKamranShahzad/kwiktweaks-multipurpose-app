export const metadata = {
  title: "KwikTweaks | Trim Audio Files",
  description:
    "Upload your audio file and trim it to your desired length. You can then preview and download the trimmed audio.",
  keywords: "audio, trim, cut, modify, edit, shorten, crop, preview, download",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Trim Audio Files",
    description:
      "Upload your audio file and trim it to your desired length. You can then preview and download the trimmed audio.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/audiotrim",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function AudioTrimLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
