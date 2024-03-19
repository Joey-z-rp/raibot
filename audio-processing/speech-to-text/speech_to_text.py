from torch import float16
from transformers import pipeline
from transformers.utils import is_flash_attn_2_available

open_marker = "<stt-output>"
close_marker = "</stt-output>"

pipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-small",
    torch_dtype=float16,
    device="mps",
    model_kwargs={"attn_implementation": "flash_attention_2"}
    if is_flash_attn_2_available()
    else {"attn_implementation": "sdpa"},
)

while True:
    file_path = input()
    outputs = pipe(
        file_path,
        chunk_length_s=30,
        batch_size=24,
    )
    output_text = outputs["text"]
    print(f"{open_marker}{output_text}{close_marker}")
