import { WebSocket } from "ws";
import { robot } from "../robot";
import { getMessage } from "./utils";

export const sendServoAngles = (connection: WebSocket) => {
  let timer: NodeJS.Timeout;
  connection.on("close", () => timer && clearTimeout(timer));
  const send = () => {
    timer = setTimeout(() => {
      connection.send(
        JSON.stringify(getMessage("SERVO_ANGLES", robot.getServoAngles()))
      );
      send();
    }, 1000);
  };
  send();
};
