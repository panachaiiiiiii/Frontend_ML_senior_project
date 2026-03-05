import tensorflow as tf
import numpy as np
from PIL import Image

IMG_SIZE = (224, 224)

# โหลดครั้งเดียวตอน start app
model = tf.keras.models.load_model("models/model.keras")

CLASS_NAMES = [
    "Melanocytic (NV + MEL) ",
    "Keratinocytic (BCC + AKIEC)",
    "Benign keratosis-like (BKL)",
    "Other benign (DF + VASC)",
]

def preprocess(image: Image.Image):
    image = image.resize(IMG_SIZE)
    image = image.convert("RGB")

    img_array = np.array(image, dtype=np.float32)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

def predict_image(image: Image.Image):
    img_array = preprocess(image)
    prediction = model.predict(img_array)[0]

    result = {
        CLASS_NAMES[i]: round(float(prob) * 100, 2)
        for i, prob in enumerate(prediction)
    }

    return result

# def predict_image(image: Image.Image):
#     img_array = preprocess(image)
#     prediction = model.predict(img_array)
#     class_id = int(np.argmax(prediction))
#     return CLASS_NAMES[class_id]