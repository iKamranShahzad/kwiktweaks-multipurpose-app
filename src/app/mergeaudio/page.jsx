"use client";
import { useState } from "react";
import { mergeAudioFiles } from "../../utils/mergeAudio";
import AudioPlayer from "react-h5-audio-player";
import LeftSection from "@/components/LeftSection";
import "react-h5-audio-player/lib/styles.css";

export default function MergeAudioPage() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [mergedAudio, setMergedAudio] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "file1") setFile1(files[0]);
    if (name === "file2") setFile2(files[0]);
  };

  const handleMerge = async () => {
    if (file1 && file2) {
      const mergedBlob = await mergeAudioFiles(file1, file2);
      const audioUrl = URL.createObjectURL(mergedBlob);
      setMergedAudio(audioUrl);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent md:flex-row">
      <LeftSection
        title="Merge Audio Files"
        description="This tool allows you to merge two audio files into one. Simply upload
          the files and merge them with one click."
      />
      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-gray-700 bg-opacity-25 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <label
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="file1"
            >
              Upload First Audio File
            </label>
            <input
              type="file"
              name="file1"
              accept="audio/*"
              onChange={handleFileChange}
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block w-full text-sm text-accent
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm hover:file:text-black
              file:bg-white-700 file:text-blue-900
              hover:file:bg-gray-300
            "
            />
          </div>
          <div className="mb-4">
            <label
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="file2"
            >
              Upload Second Audio File
            </label>
            <input
              type="file"
              name="file2"
              accept="audio/*"
              onChange={handleFileChange}
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block w-full text-sm text-accent
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm hover:file:text-black
              file:bg-white-700 file:text-blue-900
              hover:file:bg-gray-300
            "
            />
          </div>
          <button
            onClick={handleMerge}
            style={{ fontFamily: "Poppins, sans-serif" }}
            className="bg-indigo-600 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-outline"
          >
            Merge Audio
          </button>

          {mergedAudio && (
            <div className="mt-6">
              <h3
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-xl font-bold mb-2 text-accent"
              >
                Merged Audio
              </h3>
              <AudioPlayer
                src={mergedAudio}
                className="custom-audio-player"
                autoPlay={false}
                customAdditionalControls={[]}
                customVolumeControls={["VOL"]}
                style={{
                  borderRadius: "8px",
                  boxShadow:
                    "0 8px 30px rgba(0, 0, 0, 0.15), 0 4px 15px rgba(0, 0, 0, 0.05)",
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <a
                href={mergedAudio}
                download="merged_audio.wav"
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="bg-neutral-300 hover:bg-green-600 text-black py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 mt-4 inline-block"
              >
                Download Merged Audio
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
