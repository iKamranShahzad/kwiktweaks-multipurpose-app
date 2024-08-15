"use client";
import React, { useState, useRef } from "react";

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
    <div className="flex min-h-screen bg-white">
      <div className="w-1/3 p-6 bg-black text-white shadow-lg flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Audio Speed Adjuster</h2>
        <p className="text-lg">
          Upload your audio file and adjust its speed to your preference. You
          can then preview and download the modified audio.
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="audio-upload"
            >
              Upload Audio File
            </label>
            <input
              type="file"
              accept="audio/mp3"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {audioSrc && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Adjust Speed
              </label>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 text-lg font-semibold">
                  {speed}x&nbsp;
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  className="w-full"
                />
              </div>

              <button
                onClick={changeSpeedAndPreview}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              >
                Preview & Adjust Speed
              </button>
            </div>
          )}

          {modifiedAudioUrl && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Preview Modified Audio
              </h3>
              <audio controls src={modifiedAudioUrl} className="w-full mb-4" />

              <a
                href={modifiedAudioUrl}
                download="modified_audio.wav"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
