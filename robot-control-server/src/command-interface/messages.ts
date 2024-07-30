import { Position } from "./positions";

export const availableRobotServerMessages = [
  "ROBOT_STATUS",
  "CAPTURED_IMAGE",
  "ENV_UPDATES",
  "CHECK_AUDIO_TRIGGER",
  "AUDIO_INPUT",
  "SET_CURRENT_TASK",
] as const;

export type RobotServerMessage = (typeof availableRobotServerMessages)[number];

export type RobotServerMessageContents = {
  ROBOT_STATUS: {
    servoAngles: Record<Position, number>;
    speed: number;
    lastDistanceMeasurement: number;
  };
  CAPTURED_IMAGE: {
    image: string;
  };
  ENV_UPDATES: {
    image: string;
    referenceDistance: number;
  };
  CHECK_AUDIO_TRIGGER: {
    data: string;
    referenceDistance: number;
  };
  AUDIO_INPUT: {
    data: string;
  };
  SET_CURRENT_TASK: {
    currentTask: string;
  };
};

export type RobotServerMessageObject = {
  type: RobotServerMessage;
  content: RobotServerMessageContents[RobotServerMessage];
};

export const availableModelServerMessages = ["CALCULATED_ENV_UPDATES"] as const;

export type ModelServerMessage = (typeof availableModelServerMessages)[number];

export type ModelServerMessageContents = {
  CALCULATED_ENV_UPDATES: {
    image: string;
    objects: {
      name: string;
      confidence: number;
      distance: number;
      coordinate: number[];
      offCenterAngle: number;
    }[];
  };
};

export type ModelServerMessageObject = {
  type: ModelServerMessage;
  content: ModelServerMessageContents[ModelServerMessage];
};
