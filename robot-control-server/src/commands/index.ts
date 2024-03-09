import { Command, CommandObject } from "../command-interface";
import { move } from "./move";
import { moveLeg } from "./move-leg";
import { savePosture } from "./save-posture";
import { turnToAngle } from "./turnToAngle";

const commandHandlers: Record<Command, Function> = {
  MOVE: move,
  MOVE_LEG: moveLeg,
  TURN_TO_ANGLE: turnToAngle,
  SAVE_POSTURE: savePosture,
};

export const processCommand = (command: CommandObject) => {
  const handler = commandHandlers[command.command];
  if (!handler) {
    return console.warn(`Command ${command.command} is invalid`);
  }
  handler(command.args as any);
};
