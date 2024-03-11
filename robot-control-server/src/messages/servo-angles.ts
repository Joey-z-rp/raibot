import { WebSocket } from "ws";
import { robot } from "../robot";
import { getMessage } from "./utils";

export const sendRobotStatus = (connection: WebSocket) => {
  let timer: NodeJS.Timeout;
  connection.on("close", () => timer && clearTimeout(timer));
  const send = () => {
    timer = setTimeout(() => {
      connection.send(JSON.stringify(getMessage("ROBOT_STATUS", robot.status)));
      send();
    }, 1000);
  };
  send();
};
