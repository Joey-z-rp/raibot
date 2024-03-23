import { WebSocket } from "ws";
import { getMessage } from "./utils";
import { ModelServerMessageContents } from "../../../command-interface";

let currentConnection: WebSocket;

export const initialiseBrowserMessageSender = (connection: WebSocket) => {
  currentConnection = connection;
};

export const sendEnvUpdates = ({
  image,
  objects,
}: {
  image: string;
  objects: ModelServerMessageContents["CALCULATED_ENV_UPDATES"]["objects"];
}) => {
  currentConnection.send(
    JSON.stringify(
      getMessage("CALCULATED_ENV_UPDATES", {
        image: `data:image/jpeg;base64, ${image}`,
        objects,
      })
    )
  );
};
