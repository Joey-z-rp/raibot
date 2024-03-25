type EnvUpdates = {
  updatedTime: number;
  ultrasonicSensorReading: number;
  detectedObjects: {
    name: string;
    relativeDistance: number;
    offCenterAngle: number;
  }[];
};

class RobotState {
  private isRecordingAudio: boolean;

  private robotEnvUpdates: EnvUpdates;

  private refreshEnvTimer: NodeJS.Timeout;

  constructor() {
    this.isRecordingAudio = false;
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
