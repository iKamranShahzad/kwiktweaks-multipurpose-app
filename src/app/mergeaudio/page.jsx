"use client";
import { useState } from "react";
import { mergeAudioFiles } from "../../utils/mergeAudio";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; // Import the styles

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-1/3 p-6 bg-black text-white shadow-lg flex flex-col justify-center transition-all duration-500">
        <h2 className="text-4xl font-bold mb-4 transform hover:scale-105 transition-transform duration-300">
          Merge Audio Files
        </h2>
        <p className="text-lg leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300">
          This tool allows you to merge two audio files into one. Simply upload
          the files and merge them with one click.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full transition-shadow duration-300 hover:shadow-xl">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-3 transition-all duration-300 hover:text-gray-900"
              htmlFor="file1"
            >
              Upload First Audio File
            </label>
            <input
              type="file"
              name="file1"
              accept="audio/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-3 transition-all duration-300 hover:text-gray-900"
              htmlFor="file2"
            >
              Upload Second Audio File
            </label>
            <input
              type="file"
              name="file2"
              accept="audio/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
            />
          </div>
          <button
            onClick={handleMerge}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Merge Audio
          </button>

          {mergedAudio && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 transition-colors duration-300 hover:text-gray-900">
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
                }}
              />

              <a
                href={mergedAudio}
                download="merged_audio.wav"
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 mt-4 inline-block"
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
