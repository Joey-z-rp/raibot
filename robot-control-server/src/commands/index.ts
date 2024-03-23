import { Command, CommandObject } from "../command-interface";
import { captureImage } from "./capture-image";
import { getEnvUpdates } from "./get-env-updates";
import { measureDistance } from "./measure-distance";
import { move } from "./move";
import { performActions } from "./perform-actions";
import { renderLed } from "./render-led";
import { savePosture } from "./save-posture";
import { setSpeed } from "./set-speed";
import { startRecording } from "./start-recording";
import { stopActions } from "./stop-actions";
import { turnToAngle } from "./turnToAngle";

const commandHandlers: Record<Command, Function> = {
  MOVE: move,
  TURN_TO_ANGLE: turnToAngle,
  SAVE_POSTURE: savePosture,
  PERFORM_ACTIONS: performActions,
  STOP_ACTIONS: stopActions,
  SET_SPEED: setSpeed,
  RENDER_LED: renderLed,
  MEASURE_DISTANCE: measureDistance,
  CAPTURE_IMAGE: captureImage,
  GET_ENV_UPDATES: getEnvUpdates,
  START_RECORDING: startRecording,
};

export const processCommand = (command: CommandObject) => {
  const handler = commandHandlers[command.command];
  if (!handler) {
    return console.warn(`Command ${command.command} is invalid`);
  }
  handler(command.args as any);
};
