import { Command, CommandArguments } from "../command-interface";
import { move } from "./move";
import { savePosture } from "./save-posture";
import { turnToAngle } from "./turnToAngle";

const commandHandlers = {
  MOVE: move,
  TURN_TO_ANGLE: turnToAngle,
  SAVE_POSTURE: savePosture,
};

export const processCommand = <T extends Command>(message: {
  command: T;
  args: CommandArguments[T];
}) => {
  const handler = commandHandlers[message.command];
  if (!handler) {
    return console.warn(`Command ${message.command} is invalid`);
  }
  handler(message.args as any);
};
