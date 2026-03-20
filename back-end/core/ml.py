import tensorflow as tf
import numpy as np
from PIL import Image
from dotenv import load_dotenv
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(BASE_DIR, ".env")
# ✅ โหลด env ก่อน
load_dotenv(env_path)

IMG_SIZE = (224, 224)

MODEL_MAP: dict[str, tf.keras.Model] = {}

# ✅ กันค่าว่าง + strip space
model_names = [
    name.strip()
    for name in os.getenv("MODELS", "").split(",")
    if name.strip()
]

model_dir = os.getenv("MODEL_DIR", "models")
print("MODELS =", os.getenv("MODELS"))
# if not model_names:
#     raise ValueError("No models defined in .env (MODELS)")

for name in model_names:
    path = os.path.join(model_dir, f"{name}_4class_model.keras")

    print(f"Loading model: {path}")  # 🔥 debug

    if not os.path.exists(path):
        raise FileNotFoundError(f"{path} not found")

    MODEL_MAP[name] = tf.keras.models.load_model(
        path,
        compile=False
    )

CLASS_NAMES = [
    "Nevus",
    "Cancer",
    "Benign",
    "Precancer",
]


def preprocess(image: Image.Image) -> np.ndarray:
    image = image.resize(IMG_SIZE)
    image = image.convert("RGB")

    img_array = np.array(image, dtype=np.float32)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    return img_array


def predict_image(image: Image.Image, model_name: str) -> dict[str, float]:
    img_array = preprocess(image)

    model = MODEL_MAP.get(model_name)
    if model is None:
        raise ValueError(f"Model '{model_name}' not found")

    prediction = model.predict(img_array)[0]

    return {
        CLASS_NAMES[i]: round(float(prob) * 100, 2)
        for i, prob in enumerate(prediction)
    }