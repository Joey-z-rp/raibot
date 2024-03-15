from ultralytics import YOLO

# Initialize a YOLO-World model
model = YOLO('yolov8l-worldv2.pt')  # or select yolov8m/l-world.pt for different sizes
# model.set_classes(["cat", "bed"])
# Execute inference with the YOLOv8s-world model on the specified image
results = model.predict('./sample-images/Photo-2.jpeg')

# Show results

# print(results[0].names)
# print(results[0].boxes)

results[0].show()