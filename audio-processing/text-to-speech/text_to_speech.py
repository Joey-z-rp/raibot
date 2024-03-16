import torch
import uuid
from TTS.api import TTS

open_marker = "<tts-output>"
close_marker = "</tts-output>"

device = "cuda" if torch.cuda.is_available() else "cpu"

while True:
    input_text = input()
    v4 = uuid.uuid4()
    file_name = f"{v4}.wav"
    tts = TTS("tts_models/en/ljspeech/glow-tts", progress_bar=False).to(device)
    tts.tts_to_file(text=input_text, file_path=f"../temp-audio-files/{file_name}")
    print(f"{open_marker}{file_name}{close_marker}")
