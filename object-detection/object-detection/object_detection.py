from ultralytics import YOLO
from json import dumps
from default_target_classes import default_target_classes
from non_max_suppression import perform_nms

open_marker = "<object-detection-output>"
close_marker = "</object-detection-output>"

model = YOLO("yolov8l-worldv2.pt")

set_classes = default_target_classes


def contains_all(original_list, new_list):
    if new_list is None:
        return True

    return all(item in original_list for item in new_list)


while True:
    # Example input: PATH_TO_THE_FIEL, cat|bed|bottle
    user_input = input()
    arguments = user_input.split(",")
    file_path = arguments[0].strip()
    target_classes = arguments[1].strip().split("|") if len(arguments) > 1 else None
    filtered_target_classes = (
        [item.strip() for item in target_classes if item.strip()]
        if target_classes
        else None
    )

    if not contains_all(set_classes, filtered_target_classes):
        set_classes = list(set(set_classes + filtered_target_classes))
        model.set_classes(set_classes)

    results = model.predict(file_path, conf=0.3)

    names = results[0].names
    classes = results[0].boxes.cls
    confidences = results[0].boxes.conf
    coordinates = results[0].boxes.xyxy
    num_of_objects = len(classes)

    detected_objects = [None] * num_of_objects

    for i in range(num_of_objects):
        detected_objects[i] = {
            "name": names[int(classes[i].item())],
            "confidence": confidences[i].item(),
            "coordinate": coordinates[i],
        }

    filtered_objects = perform_nms(detected_objects, iou_threshold=0.3)
    output = dumps(filtered_objects)

    print(f"{open_marker}{output}{close_marker}")
