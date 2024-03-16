from typing import List, Dict, TypedDict
import random


class Object(TypedDict):
    name: str
    coordinate: List[float]  # xyxy


DepthMap = List[List[float]]
OutputDistances = Dict[str, float]


def sample_points(
    depth_map: DepthMap, box: List[float], num_points=100, edge_margin=0.2
):
    x1, y1, x2, y2 = [int(num) for num in box]
    width = x2 - x1
    height = y2 - y1

    min_edge_margin_x = max(int(width * edge_margin), 1)
    min_edge_margin_y = max(int(height * edge_margin), 1)

    # Adjust the box coordinates
    x1 += min_edge_margin_x
    y1 += min_edge_margin_y
    x2 -= min_edge_margin_x
    y2 -= min_edge_margin_y

    points = []
    for _ in range(num_points):
        x = random.randint(x1, x2)
        y = random.randint(y1, y2)
        points.append((x, y))

    total_depth = sum(depth_map[y][x] for x, y in points)
    average_depth = total_depth / num_points

    return average_depth


def calculate_distances(
    depth_map: DepthMap, reference_distance: float, objects: List[Object]
):
    width = len(depth_map[0])
    height = len(depth_map)

    reference_x1_percent = 0.4
    reference_y1_percent = 0.5
    reference_x2_percent = 0.6
    reference_y2_percent = 0.8

    reference_coordinate = [
        int(width * reference_x1_percent),
        int(height * reference_y1_percent),
        int(width * reference_x2_percent),
        int(height * reference_y2_percent),
    ]

    reference_depth = sample_points(depth_map, reference_coordinate)

    output_distances: OutputDistances = {}

    for obj in objects:
        depth = sample_points(depth_map, obj["coordinate"])
        print(obj["name"], depth)
        output_distances[obj["name"]] = reference_distance / depth * reference_depth

    return output_distances
