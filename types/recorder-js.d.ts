declare module 'recorder-js' {
  class Recorder {
    constructor(
      audioContext: AudioContext,
      config?: {
        nFrequencyBars?: number;
        onAnalysed?: (data: { data: number[]; lineTo: number }) => void;
      }
    );
    static download(blob: Blob, filename?: string): void;
    init(stream: MediaStream): Promise<void>;
    start(): Promise<MediaStream>;
    stop(): Promise<{ buffer: AudioBuffer; blob: Blob }>;
    updateAnalysers(): void;
    setOnAnalysed(
      handler: (data: { data: number[]; lineTo: number }) => void
    ): void;
  }

  export default Recorder;
}
