from typing import TypedDict, List
from torch import device, no_grad
from utils import read_image
from time import time
from json import loads, dumps
from midas.model_loader import default_models, load_model
from run import process
from calculate_distances import Object, calculate_distances

open_marker = "<depth-estimation-output>"
close_marker = "</depth-estimation-output>"

running_device = device("mps")
model_type = "dpt_swin2_large_384"
model_path = default_models[model_type]
model, transform, net_w, net_h = load_model(
    running_device, model_path, model_type, False, None, False
)


class InputData(TypedDict):
    file_path: str
    reference_distance: float  # cm
    objects: List[Object]


while True:
    input_string = input()

    start_time = time()
    inputData: InputData = loads(input_string)

    # input
    original_image_rgb = read_image(inputData["file_path"])  # in [0, 1]
    image = transform({"image": original_image_rgb})["image"]

    # compute
    with no_grad():
        prediction = process(
            running_device,
            model,
            model_type,
            image,
            (net_w, net_h),
            original_image_rgb.shape[1::-1],
            False,
            False,
        )

    distances = calculate_distances(
        prediction, inputData["reference_distance"], inputData["objects"]
    )
    print(f"{open_marker}{dumps(distances)}{close_marker}")

    end_time = time()
    elapsed_time = end_time - start_time
    print("Elapsed time:", elapsed_time, "seconds")
