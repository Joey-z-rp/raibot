import { runModel } from "../language-model";
import { startSttProcessor } from "../speech-to-text";
import { startTtsProcessor } from "../text-to-speech";

const { transcribe } = startSttProcessor();
const { convert } = startTtsProcessor();
const { ask, askExternal } = runModel();

export { transcribe, convert, ask, askExternal };
