import WavEncoder from "wav-encoder";

export async function mergeAudioFiles(file1, file2) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const buffer1 = await loadAudioBuffer(audioContext, file1);
  const buffer2 = await loadAudioBuffer(audioContext, file2);

  const outputBuffer = audioContext.createBuffer(
    buffer1.numberOfChannels,
    buffer1.length + buffer2.length,
    buffer1.sampleRate
  );

  // Merging the audio files
  for (let i = 0; i < buffer1.numberOfChannels; i++) {
    const outputData = outputBuffer.getChannelData(i);
    outputData.set(buffer1.getChannelData(i));
    outputData.set(buffer2.getChannelData(i), buffer1.length);
  }

  // Convert to WAV using wav-encoder
  const wavArrayBuffer = await WavEncoder.encode({
    sampleRate: outputBuffer.sampleRate,
    channelData: Array.from({ length: outputBuffer.numberOfChannels }, (_, i) =>
      outputBuffer.getChannelData(i)
    ),
  });

  return new Blob([wavArrayBuffer], { type: "audio/wav" });
}

async function loadAudioBuffer(audioContext, file) {
  const arrayBuffer = await file.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
}
