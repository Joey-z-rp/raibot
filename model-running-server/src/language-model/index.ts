import { spawn } from "child_process";
import { createInterface } from "readline";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./prompt";

const anthropic = new Anthropic();

const getUserInput = async (): Promise<string> => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question("Enter external response:\n", (input) => {
      readline.close();
      resolve(input);
    });
  });
};

const MESSAGE_LIMIT = 10;

type LocalModelResponse = {
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
    processor.stdout.on("data", (data) => console.info(data));
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

const invokeLocal = async (text: string) => {
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

  const result: LocalModelResponse = await response.json();

  if (!result.message) throw new Error(`Invalid response: ${result}`);

  messages.push(result.message);

  return result.message.content;
};

const invokeClaude = async (text: string, image?: string) => {
  messages.push({
    role: "user",
    content: [
      { text, type: "text" },
      image
        ? {
            source: { type: "base64", data: image, media_type: "image/jpeg" },
            type: "image",
          }
        : undefined,
    ].filter(Boolean),
  });

  const result = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0,
    system: systemPrompt,
    messages,
  });

  if (!(result.content[0].type === "text"))
    throw new Error(`Invalid response: ${result}`);

  const responseText = result.content[0].text;
  messages.push({
    role: "assistant",
    content: [{ text: responseText, type: "text" }],
  });

  return responseText;
};

const invokeModel = ({
  text,
  image,
  type,
}: {
  text: string;
  image?: string;
  type: "local" | "claude";
}) => {
  switch (type) {
    case "local":
      return invokeLocal(text);
    case "claude":
      return invokeClaude(text, image);
    default:
      return invokeLocal(text);
  }
};

export const runModel = (type: "local" | "claude" = "local") => {
  createModel();

  const ask = async (text: string, image?: string) => {
    console.info("User: ", text);
    if (isProcessing)
      return console.warn("Previous conversation is still in progress");

    isProcessing = true;

    const response = await invokeModel({ text, type, image });

    if (messages.length > MESSAGE_LIMIT)
      messages.splice(messages.length - MESSAGE_LIMIT);
    isProcessing = false;
    console.info("Response: ", response);

    return response;
  };

  return { ask };
};
