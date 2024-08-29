export const metadata = {
  title: "KwikTweaks | Merge Audio Files",
  description:
    "Easily merge multiple audio files into one. Upload your audio files, combine them, and download the merged file seamlessly.",
  keywords:
    "merge audio, combine audio files, audio merger, join audio, audio editing, audio tools, download merged audio",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Merge Audio Files",
    description:
      "Easily merge multiple audio files into one. Upload your audio files, combine them, and download the merged file seamlessly.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/mergeaudio",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function MergeAudioLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
