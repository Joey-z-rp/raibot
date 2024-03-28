export type ReadyMessage = {
  type: "READY";
};

export type PerformActionMessage = {
  type: "PERFORM_ACTION";
  action: string;
};

export type GetDistanceMessage = {
  type: "GET_DISTANCE";
};

export type DetectObjectMessage = {
  type: "DETECT_OBJECT";
  name: string;
};

export type EvaluateCodeMessage = {
  type: "EVALUATE_CODE";
  code: string;
};

export type ActionPerformedMessage = {
  type: "ACTION_PERFORMED";
  operationId: string;
};

export type LatestDistanceMessage = {
  type: "LATEST_DISTANCE";
  distance: number;
  operationId: string;
};

export type DetectedObjectMessage = {
  type: "DETECTED_OBJECT";
  offCenterAngle?: number;
  operationId: string;
};
