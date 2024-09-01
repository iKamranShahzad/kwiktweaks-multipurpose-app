import { Suspense } from "react";
import Navbar from "./Navbar";
import "@fontsource/poppins";
import Loading from "../app/loading";

const optionsTools = [
  { value: "/digitalSignature", label: "Digital Signature" },
  { value: "/qrcode", label: "QR Generator" },
  { value: "/snippetgen", label: "Snippet Screens" },
];

const optionsAudio = [
  { value: "/audiotrim", label: "Trim MP3" },
  { value: "/adjustspeed", label: "Adjust Speed" },
  { value: "/mergeaudio", label: "Merge Audio" },
];

const optionsPDF = [
  { value: "/pdfMerger", label: "Merge PDFs" },
  { value: "#", label: "Suboption 2" },
  { value: "#", label: "Suboption 3" },
];

export default function Header() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar
          optionsTools={optionsTools}
          optionsAudio={optionsAudio}
          optionsPDF={optionsPDF}
        />
      </Suspense>
    </>
  );
}
