"use client";
import React, { useState, useRef } from "react";
import LeftSection from "@/components/LeftSection";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function AudioSpeedAdjuster() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [modifiedAudioUrl, setModifiedAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedBuffer);
      audioContextRef.current = audioContext;

      setAudioSrc(URL.createObjectURL(new Blob([arrayBuffer])));
    }
  };

  const changeSpeedAndPreview = async () => {
    if (!audioBuffer || !audioContextRef.current) return;

    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      (audioBuffer.duration * audioContextRef.current.sampleRate) / speed,
      audioContextRef.current.sampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = speed;
    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();

    const audioBlob = await bufferToWaveBlob(renderedBuffer);
    setModifiedAudioUrl(URL.createObjectURL(audioBlob));
  };

  const bufferToWaveBlob = (buffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const bufferArray = new ArrayBuffer(length);
    const view = new DataView(bufferArray);

    const channels = [];
    let sample;
    let offset = 0;
    let pos = 0;

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit (hardcoded in this demo)

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    for (let i = 0; i < numOfChan; i++) channels.push(buffer.getChannelData(i));

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample * 32767) | 0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true); // write 16-bit sample
        pos += 2;
      }
      offset++;
    }

    return new Blob([bufferArray], { type: "audio/wav" });

    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent md:flex-row">
      <LeftSection
        title="Audio Speed Adjuster"
        description="Upload your audio file and adjust its speed to your preference. You
          can then preview and download the modified audio."
      />
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-gray-700 bg-opacity-25 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <label
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="audio-upload"
            >
              Upload Audio File
            </label>
            <input
              type="file"
              accept="audio/mp3"
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

          {audioSrc && (
            <div className="mb-4">
              <label
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="block text-accent text-sm font-bold mb-2"
              >
                Adjust Speed
              </label>
              <div
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4"
              >
                <span className="text-lg font-semibold text-accent">
                  {speed}x
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  className="w-full md:w-3/4"
                />
              </div>

              <button
                onClick={changeSpeedAndPreview}
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="bg-indigo-600 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none transition-all duration-300 focus:shadow-outline"
              >
                Preview & Adjust Speed
              </button>
            </div>
          )}

          {modifiedAudioUrl && (
            <div className="mt-6">
              <h3
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-xl font-bold mb-2 text-accent"
              >
                Preview Modified Audio
              </h3>
              <AudioPlayer
                src={modifiedAudioUrl}
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
                href={modifiedAudioUrl}
                download="modified_audio.wav"
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="bg-neutral-300 hover:bg-green-600 text-black py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 mt-4 inline-block"
              >
                Download Modified Audio
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
