import * as recorder from "./node-record-lpcm16";
import { EventEmitter, Stream } from "stream";

const BIT_DEPTH = 32768; // 16 bit
const START_RECORDING_EVENT = "startRecording";
const STOP_RECORDING_EVENT = "stopRecording";

type OnRecorded = (audioBuffer: Buffer | undefined) => void;

export class AutoRecorder {
  private monitorStream: Stream;

  private isRecording: boolean;

  private event: EventEmitter;

  private recentSamples: number[];

  private recording;

  constructor() {
    this.isRecording = false;
    this.monitorStream = recorder.record().stream();
    this.event = new EventEmitter();
    this.recentSamples = [];
  }

  detectSound(data: Buffer, threshold = 0.3, consecutiveSamples = 5) {
    const samples = new Int16Array(data.buffer);
    let consecutiveCount = 0;

    for (const sample of samples) {
      const normalizedSample = Math.abs(sample) / BIT_DEPTH;
      if (normalizedSample >= threshold) {
        consecutiveCount++;
        if (consecutiveCount >= consecutiveSamples) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }

    return false;
  }

  detectSilence(
    data: Buffer,
    threshold = 0.08,
    silenceDuration = 1500,
    sampleRate = 16000,
    maxSpikes = 10
  ) {
    const samples = new Int16Array(data.buffer);
    const maxSilencedSamples = Math.floor(
      (silenceDuration / 1000) * sampleRate
    );
    this.recentSamples = this.recentSamples.concat(Array.from(samples));

    let spikeCount = 0;
    let silentCount = 0;

    for (const sample of this.recentSamples) {
      const normalizedSample = Math.abs(sample) / BIT_DEPTH;

      if (normalizedSample < threshold) {
        silentCount++;
        if (silentCount >= maxSilencedSamples) {
          this.recentSamples = [];
          return true;
        }
      } else {
        spikeCount++;
        if (spikeCount > maxSpikes) {
          silentCount = 0;
          spikeCount = 0;
        }
      }
    }

    this.recentSamples = this.recentSamples.slice(-maxSilencedSamples);

    return false;
  }

  registerRecordingEvents(onRecorded: OnRecorded, noSoundTimeout = 4000) {
    const audioChunks = [];
    let isTimeout = false;

    const startRecordingListener = () => {
      if (!this.isRecording) {
        this.isRecording = true;
        this.recording = recorder.record();
        const stream = this.recording.stream();
        stream.on("data", (chunk: Buffer) => audioChunks.push(chunk));

        let isCheckingSilence = false;
        let timer: NodeJS.Timeout;
        const monitorOutput = (data) => {
          const stop = () => {
            this.event.emit(STOP_RECORDING_EVENT);
            this.monitorStream.removeListener("data", monitorOutput);
          };
          if (!isCheckingSilence) {
            if (!timer)
              timer = setTimeout(() => {
                isTimeout = true;
                stop();
              }, noSoundTimeout);
            if (this.detectSound(data, 0.2)) {
              isCheckingSilence = true;
              timer && clearTimeout(timer);
              console.info("Checking silence...");
            }
          }
          if (
            isCheckingSilence &&
            this.detectSilence(data) &&
            this.isRecording
          ) {
            stop();
          }
        };
        this.monitorStream.on("data", monitorOutput);

        this.event.removeListener(
          START_RECORDING_EVENT,
          startRecordingListener
        );
        console.info("Recording...");
      }
    };
    this.event.on(START_RECORDING_EVENT, startRecordingListener);

    const stopRecordingListener = () => {
      if (this.isRecording) {
        this.recording.stop();
        console.info(isTimeout ? "Recording stopped" : "Recording completed");
        onRecorded(isTimeout ? undefined : Buffer.concat(audioChunks));
        this.isRecording = false;
        this.event.removeListener(STOP_RECORDING_EVENT, stopRecordingListener);
      }
    };
    this.event.on(STOP_RECORDING_EVENT, stopRecordingListener);
  }

  startAutoRecording(onRecorded: OnRecorded) {
    this.registerRecordingEvents(onRecorded);

    const monitorInput = (data: Buffer) => {
      if (this.detectSound(data) && !this.isRecording) {
        this.event.emit(START_RECORDING_EVENT);
        this.monitorStream.removeListener("data", monitorInput);
      }
    };
    this.monitorStream.on("data", monitorInput);
  }

  startRecording(onRecorded: OnRecorded) {
    this.registerRecordingEvents(onRecorded);
    this.event.emit(START_RECORDING_EVENT);
  }
}

export const autoRecorder = new AutoRecorder();
