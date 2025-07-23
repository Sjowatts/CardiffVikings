
import os
import json

folder_path = "assets/images/gallery"
output_file = os.path.join(folder_path, "gallery.json")

image_extensions = (".jpg", ".jpeg", ".png", ".webp")

images = [
    os.path.join(folder_path, f).replace("\\", "/")
    for f in sorted(os.listdir(folder_path))
    if f.lower().endswith(image_extensions)
]

with open(output_file, "w") as f:
    json.dump(images, f, indent=2)

print(f"✅ gallery.json created with {len(images)} image(s)")
