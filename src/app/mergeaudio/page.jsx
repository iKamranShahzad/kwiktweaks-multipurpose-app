"use client";
import { useState } from "react";
import { mergeAudioFiles } from "../../utils/mergeAudio";
import AudioPlayer from "react-h5-audio-player";
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
    <div className="flex flex-col min-h-screen bg-primary md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/3 p-4 md:p-6 bg-primary text-white shadow-lg flex flex-col justify-center">
        <h2
          style={{ fontFamily: "Courier New, monospace" }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Merge Audio Files
        </h2>
        <p
          style={{ fontFamily: "Courier New, monospace" }}
          className="text-base md:text-lg"
        >
          This tool allows you to merge two audio files into one. Simply upload
          the files and merge them with one click.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-secondary p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <label
              style={{ fontFamily: "Courier New, monospace" }}
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
              style={{ fontFamily: "Courier New, monospace" }}
              className="block w-full text-sm text-accent
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-800 file:text-accent
              hover:file:bg-gray-600
            "
            />
          </div>
          <div className="mb-4">
            <label
              style={{ fontFamily: "Courier New, monospace" }}
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
              style={{ fontFamily: "Courier New, monospace" }}
              className="block w-full text-sm text-accent
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-800 file:text-accent
              hover:file:bg-gray-600
            "
            />
          </div>
          <button
            onClick={handleMerge}
            style={{ fontFamily: "Courier New, monospace" }}
            className="bg-primary hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-outline"
          >
            Merge Audio
          </button>

          {mergedAudio && (
            <div className="mt-6">
              <h3
                style={{ fontFamily: "Courier New, monospace" }}
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
                  fontFamily: "Courier New, monospace",
                  fontWeight: "bold",
                  backgroundColor: "#FFFFFF",
                }}
              />
              <a
                href={mergedAudio}
                download="merged_audio.wav"
                style={{ fontFamily: "Courier New, monospace" }}
                className="bg-primary hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 mt-4 inline-block"
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
