export const metadata = {
  title: "KwikTweaks | Adjust Audio Speed",
  description:
    "Upload your audio file and adjust its speed to your preference. You can then preview and download the modified audio.",
  keywords:
    "audio, speed, adjust, modify, change, increase, decrease, preview, download",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - A Multipurpose Webapp",
    description:
      "Upload your audio file and adjust its speed to your preference. You can then preview and download the modified audio.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/adjustspeed",
    type: "website",
    images: [
      {
        url: "/public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function AdjustSpeedLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
