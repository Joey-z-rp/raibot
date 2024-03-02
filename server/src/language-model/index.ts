import { spawn } from "child_process";

const MESSAGE_LIMIT = 30;

type ModelResponse = {
  message: {
    role: "user" | "assistant";
    content: string;
  };
};

const createModel = () =>
  new Promise((res, rej) => {
    const processor = spawn(
      "ollama create raibot -f ./src/language-model/Modelfile",
      { shell: true }
    );

    processor.on("exit", function (code) {
      if (code === 0) {
        res(undefined);
      } else {
        rej("Failed to create model");
      }
    });
  });

let isProcessing = false;
const messages = [];

export const runModel = async () => {
  await createModel();

  const ask = async (text: string) => {
    console.info("User: ", text);
    if (isProcessing)
      return console.warn("Previous conversation is still in progress");

    isProcessing = true;
    messages.push({
      role: "user",
      content: text,
    });
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      body: JSON.stringify({
        model: "raibot",
        stream: false,
        keep_alive: "5m",
        messages,
      }),
    });

    const result: ModelResponse = await response.json();

    if (!result.message) throw new Error(`Invalid response: ${result}`);

    messages.push(result.message);
    if (messages.length > MESSAGE_LIMIT)
      messages.splice(messages.length - MESSAGE_LIMIT);
    isProcessing = false;
    console.info("Response: ", result.message.content);

    return result.message.content;
  };

  return { ask };
};
