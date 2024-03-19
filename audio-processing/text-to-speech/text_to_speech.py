from uuid import uuid4
from TTS.api import TTS

open_marker = "<tts-output>"
close_marker = "</tts-output>"

device = "cpu"

while True:
    input_text = input()
    v4 = uuid4()
    file_name = f"{v4}.wav"
    tts = TTS("tts_models/en/ljspeech/glow-tts", progress_bar=False).to(device)
    tts.tts_to_file(text=input_text, file_path=f"../temp-audio-files/{file_name}")
    print(f"{open_marker}{file_name}{close_marker}")
