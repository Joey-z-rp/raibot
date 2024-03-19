from collections import defaultdict
from operator import itemgetter
from typing import List, TypedDict
from torch import Tensor
from torchvision import ops


class DetectedObject(TypedDict):
    name: str
    confidence: int
    coordinate: Tensor  # xyxy


DetectedObjects = List[DetectedObject]


def group_and_sort(detected_objects: DetectedObjects):
    grouped_objects = defaultdict(list)

    for obj in detected_objects:
        grouped_objects[obj["name"]].append(obj)

    for group in grouped_objects.values():
        group.sort(key=itemgetter("confidence"), reverse=True)

    return grouped_objects


def perform_nms(detected_objects: DetectedObjects, iou_threshold: float):
    grouped_and_sorted = group_and_sort(detected_objects)

    filtered_objects = []

    for group in grouped_and_sorted.values():
        while group:
            obj = group.pop(0)
            box1 = obj["coordinate"]
            obj["coordinate"] = box1.tolist()
            filtered_objects.append(obj)

            to_remove = []
            for other_obj in group:
                box2 = other_obj["coordinate"]
                iou = ops.box_iou(box1.unsqueeze(0), box2.unsqueeze(0)).item()
                if iou > iou_threshold:
                    to_remove.append(other_obj)
            for obj_to_remove in to_remove:
                group.remove(obj_to_remove)

    return filtered_objects
