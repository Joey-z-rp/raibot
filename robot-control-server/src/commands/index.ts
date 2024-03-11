import { Command, CommandObject } from "../command-interface";
import { move } from "./move";
import { performActions } from "./perform-actions";
import { renderLed } from "./render-led";
import { savePosture } from "./save-posture";
import { setSpeed } from "./set-speed";
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
};

export const processCommand = (command: CommandObject) => {
  const handler = commandHandlers[command.command];
  if (!handler) {
    return console.warn(`Command ${command.command} is invalid`);
  }
  handler(command.args as any);
};
