"use client";
import React, { useState, useRef, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function AudioEditor() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [trimmedAudioSrc, setTrimmedAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
        setEndTime(audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    }
  }, [audioSrc]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setAudioSrc(url);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTrim = async () => {
    if (startTime >= endTime) {
      alert("Start time must be less than end time");
      return;
    }

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const response = await fetch(audioSrc);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const trimmedBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      (endTime - startTime) * audioBuffer.sampleRate,
      audioBuffer.sampleRate
    );

    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      const trimmedChannelData = trimmedBuffer.getChannelData(channel);
      for (let i = 0; i < trimmedBuffer.length; i++) {
        trimmedChannelData[i] =
          channelData[i + Math.floor(startTime * audioBuffer.sampleRate)];
      }
    }

    const trimmedBlob = audioBufferToWav(trimmedBuffer);
    const trimmedUrl = URL.createObjectURL(trimmedBlob);
    setTrimmedAudioSrc(trimmedUrl);
  };

  function audioBufferToWav(buffer) {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length * numberOfChannels * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, length, true);

    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(
          -1,
          Math.min(1, buffer.getChannelData(channel)[i])
        );
        view.setInt16(
          offset,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true
        );
        offset += 2;
      }
    }

    return new Blob([view], { type: "audio/wav" });
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary md:flex-row">
      <div className="w-full md:w-1/3 p-4 md:p-6 bg-primary text-white shadow-lg flex flex-col justify-center">
        <h2
          style={{ fontFamily: "Courier New, monospace" }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          Audio Trimmer
        </h2>
        <p
          style={{ fontFamily: "Courier New, monospace" }}
          className="text-base md:text-lg"
        >
          This tool allows you to upload an audio file, play/pause it, seek
          within it, and trim it to a specified range. You can then download the
          trimmed audio.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center p-4 md:p-6">
        <div className="bg-secondary p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <label
              style={{ fontFamily: "Courier New, monospace" }}
              className="block text-accent text-sm font-bold mb-2"
              htmlFor="audio-upload"
            >
              Upload Audio File
            </label>
            <input
              type="file"
              id="audio-upload"
              accept="audio/mp3"
              onChange={handleFileUpload}
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
          {audioSrc && (
            <div>
              <audio ref={audioRef} src={audioSrc} className="hidden" />
              <div
                style={{ fontFamily: "Courier New, monospace" }}
                className="mb-4"
              >
                <button
                  onClick={handlePlayPause}
                  className="bg-slate-400 hover:bg-slate-200 text-primary font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full"
                />
                <div
                  style={{ fontFamily: "Courier New, monospace" }}
                  className="flex justify-between text-sm text-accent"
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="mb-4">
                <label
                  style={{ fontFamily: "Courier New, monospace" }}
                  className="block text-accent text-sm font-bold mb-2"
                >
                  Trim Range
                </label>
                <div
                  style={{ fontFamily: "Courier New, monospace" }}
                  className="flex flex-col md:flex-row items-center font-bold space-y-2 md:space-y-0 md:space-x-2"
                >
                  <input
                    type="number"
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(
                        Math.max(
                          0,
                          Math.min(parseFloat(e.target.value), endTime)
                        )
                      )
                    }
                    className="shadow appearance-none border rounded w-full md:w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    value={endTime}
                    onChange={(e) =>
                      setEndTime(
                        Math.max(
                          startTime,
                          Math.min(parseFloat(e.target.value), duration)
                        )
                      )
                    }
                    className="shadow appearance-none border rounded w-full md:w-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <button
                onClick={handleTrim}
                style={{ fontFamily: "Courier New, monospace" }}
                className="bg-primary hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none ransition-all duration-300 focus:shadow-outline"
              >
                Trim Audio
              </button>
            </div>
          )}
          {trimmedAudioSrc && (
            <div className="mt-6">
              <h3
                style={{ fontFamily: "Courier New, monospace" }}
                className="text-xl font-bold mb-2 text-accent"
              >
                Trimmed Audio
              </h3>
              <AudioPlayer
                src={trimmedAudioSrc}
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
                href={trimmedAudioSrc}
                download="trimmed_audio.wav"
                style={{ fontFamily: "Courier New, monospace" }}
                className="bg-primary hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 mt-4 inline-block"
              >
                Download Trimmed Audio
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioEditor;
