export const metadata = {
  title: "KwikTweaks | Code Snippet Screenshot Generator",
  description:
    "Generate beautiful screenshots of your code snippets with ease.",
  keywords:
    "code snippet, code screenshot, code snippet screenshot, code screenshot generator, code snippet generator",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Code Snippet Screenshot Generator",
    description:
      "Generate beautiful screenshots of your code snippets with ease.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/snippetgen",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function SnippetGenLayout({ children }) {
  return <>{children}</>;
}
