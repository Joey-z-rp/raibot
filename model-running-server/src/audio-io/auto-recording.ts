import * as recorder from "node-record-lpcm16";
import { createWriteStream } from "fs";
import { v4 } from "uuid";
import { TEMP_AUDIO_FOLDER_PATH } from "../shared/constants";
import { Stream } from "stream";
import { deleteFile } from "../utils";

const SILENCE_DURATION = 1500;
const SAMPLE_RATE = 16000;
const MAX_SILENCED_SAMPLES = Math.floor(
  (SILENCE_DURATION / 1000) * SAMPLE_RATE
);
const EXCEED_THRESHOLD_MIN_COUNT = 20;
const BIT_DEPTH = 32768; // 16 bit

const getFilePath = () => `${TEMP_AUDIO_FOLDER_PATH}/${v4()}.wav`;

type OnRecorded = (filePath?: string) => Promise<void>;

export class AutoRecorder {
  private monitorStream: Stream;

  private isAutoRecording: boolean;

  private isRecording: boolean;

  private recentSamples: number[];

  private onRecorded: OnRecorded;

  private audioChunks: Buffer[];

  private filePath: string;

  private recording;

  constructor() {
    this.isAutoRecording = false;
    this.isRecording = false;
    this.monitorStream = recorder.record().stream();
    this.recentSamples = [];
    this.audioChunks = [];
    this.filePath = undefined;
    this.registerListener();
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

  detectSilence(threshold = 0.08, maxSpikes = 10) {
    let spikeCount = 0;
    let silentCount = 0;

    for (const sample of this.recentSamples) {
      const normalizedSample = Math.abs(sample) / BIT_DEPTH;

      if (normalizedSample < threshold) {
        silentCount++;
        if (silentCount >= MAX_SILENCED_SAMPLES) return true;
      } else {
        spikeCount++;
        if (spikeCount > maxSpikes) {
          silentCount = 0;
          spikeCount = 0;
        }
      }
    }

    return false;
  }

  isSilence(recordedBuffer: Buffer, threshold = 0.08) {
    const samples = Array.from(new Int16Array(recordedBuffer.buffer));
    const count = samples.reduce((count, sample) => {
      const normalizedSample = Math.abs(sample) / BIT_DEPTH;

      return normalizedSample > threshold ? count + 1 : count;
    }, 0);

    return count < EXCEED_THRESHOLD_MIN_COUNT;
  }

  record() {
    if (!this.recording) {
      console.info("Recording...");
      this.audioChunks = [];
      this.recentSamples = [];
      this.filePath = getFilePath();
      this.recording = recorder.record();
      const stream = this.recording.stream();
      stream.pipe(createWriteStream(this.filePath));
      stream.on("data", (recordingChunk: Buffer) =>
        this.audioChunks.push(recordingChunk)
      );
    }

    if (this.detectSilence(0.1)) {
      this.recording.stop();
      this.recording = undefined;
      this.isRecording = false;
      const recordedBuffer = Buffer.concat(this.audioChunks);
      const isEmpty = this.isSilence(recordedBuffer);
      if (isEmpty) deleteFile(this.filePath);
      this.onRecorded(isEmpty ? undefined : this.filePath);
      this.filePath = undefined;
      console.info("Recording completed");
    }
  }

  registerListener() {
    const monitor = (chunk: Buffer) => {
      if (!this.isAutoRecording && !this.isRecording) return;

      const samples = new Int16Array(chunk.buffer);
      this.recentSamples = this.recentSamples.concat(Array.from(samples));
      this.recentSamples = this.recentSamples.slice(-MAX_SILENCED_SAMPLES);

      if (this.isAutoRecording && this.detectSound(chunk)) {
        this.isAutoRecording = false;
        this.isRecording = true;
      }
      if (this.isRecording) {
        this.record();
      }
    };
    this.monitorStream.on("data", monitor);
  }

  startAutoRecording(onRecorded: OnRecorded) {
    if (this.isRecording) return;

    this.onRecorded = onRecorded;
    this.isAutoRecording = true;
  }

  startRecording(onRecorded: OnRecorded) {
    if (this.isRecording) return;

    this.onRecorded = onRecorded;
    this.isAutoRecording = false;
    this.isRecording = true;
  }
}
