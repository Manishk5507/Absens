import numpy as np
import cv2
from PIL import Image
from torchvision import transforms

# Augment image to generate image variations

def augment_image(image):
    """
    Augment the input image to generate image variations
    :param image: Input image
    :return: Augmented image
    """
    # Convert image to PIL format
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(image)
    
    # Apply random transformations to the image
    transform = transforms.Compose([
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(degrees=30),
        transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1, hue=0.1),
        transforms.RandomAffine(degrees=0, translate=(0.1, 0.1), scale=(0.9, 1.1))
    ])
    
    augmented_image = transform(image)
    augmented_image = np.array(augmented_image)
    augmented_image = cv2.cvtColor(augmented_image, cv2.COLOR_RGB2BGR)
    
    return augmented_image