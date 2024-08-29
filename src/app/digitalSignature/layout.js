export const metadata = {
  title: "KwikTweaks | Digital Signature",
  description:
    "Securely sign your signatures online and download them with ease.",
  keywords:
    "digital signature, sign documents, e-signature, electronic signature, secure, online signing, document signing, download",
  author: "KwikTweaks",
  robots: "index, follow",
  metadataBase: new URL("https://ikamranshahzad.github.io"),
  openGraph: {
    title: "KwikTweaks - Digital Signature",
    description:
      "Securely sign your signatures online and download them with ease.",
    url: "https://ikamranshahzad.github.io/kwiktweaks-multipurpose-app/digitalSignature",
    type: "website",
    images: [
      {
        url: "../../../public/mainlogo-color.png",
        alt: "KwikTweaks Logo",
      },
    ],
  },
};

export default function DigitalSignatureLayout({ children }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
