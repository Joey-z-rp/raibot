import { RobotServerMessageObject } from "../command-interface";

type EnvUpdates = {
  updatedTime: number;
  ultrasonicSensorReading: number;
};

type ProcessMessage = (message: RobotServerMessageObject | null) => void;

class RobotState {
  private isPlayingAudio: boolean;

  private isRecordingAudio: boolean;

  private robotEnvUpdates: EnvUpdates;

  private refreshEnvTimer: NodeJS.Timeout;

  private currentRobotTask: string;

  private queuedMessageToProcess: RobotServerMessageObject;

  private processMessage: ProcessMessage;

  constructor() {
    this.isRecordingAudio = false;
    this.currentRobotTask = "";
  }

  get currentTask() {
    return this.currentRobotTask;
  }

  setCurrentTask(task: string) {
    this.currentRobotTask = task;
  }

  setProcessMessage(fn: ProcessMessage) {
    this.processMessage = fn;
  }

  get queuedMessage() {
    return this.queuedMessageToProcess;
  }

  queueMessage(message: RobotServerMessageObject) {
    this.queuedMessageToProcess = message;
  }

  get isPlaying() {
    return this.isPlayingAudio;
  }

  setIsPlaying({
    isPlaying,
    clearQueuedMessage,
  }: {
    isPlaying: boolean;
    clearQueuedMessage?: boolean;
  }) {
    this.isPlayingAudio = isPlaying;
    if (!isPlaying && this.queuedMessageToProcess) {
      if (!clearQueuedMessage) {
        this.processMessage?.(this.queuedMessageToProcess);
      }
      this.queuedMessageToProcess = undefined;
    }
  }

  get isRecording() {
    return this.isRecordingAudio;
  }

  setIsRecording(isRecording: boolean) {
    this.isRecordingAudio = isRecording;
  }

  get envUpdates() {
    return this.robotEnvUpdates;
  }

  setEnvUpdates(envUpdates: EnvUpdates) {
    if (
      !this.robotEnvUpdates?.updatedTime ||
      this.robotEnvUpdates.updatedTime < envUpdates.updatedTime
    ) {
      this.robotEnvUpdates = envUpdates;
    }
  }

  setRefreshEnvTimer(timer: NodeJS.Timeout) {
    this.clearRefreshEnvTimer();
    this.refreshEnvTimer = timer;
  }

  clearRefreshEnvTimer() {
    if (this.refreshEnvTimer) clearTimeout(this.refreshEnvTimer);
  }
}

export const robotState = new RobotState();
