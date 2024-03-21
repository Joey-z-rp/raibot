import { RobotServerMessageObject } from "../../command-interface";

export type SendMessage = (message: RobotServerMessageObject) => void;
