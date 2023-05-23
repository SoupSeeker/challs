import cv2
import os
from pyzbar.pyzbar import decode
import PIL
from PIL import Image
import numpy as np

img = Image.open('qr.png')
#np_img = np.array(img)

if not os.path.isfile('qr.png'):
    print("File not found")


cell = 250

width, height = img.size

c_array = []

detector = cv2.QRCodeDetector()

for y in range(0, height, cell):
    for x in range(0, width, cell):
        bbox = (x, y, x+cell, y+cell)
        cropped_img = img.crop(bbox)
        np_img = np.array(cropped_img)
        np_img = cv2.cvtColor(np_img, cv2.COLOR_BGR2GRAY)    
        c_array.append(np_img)

for i, np_img in enumerate(c_array):

    if np.sum(np_img) == 0:
        print(f"QR code {i+1}: Cropped image is empty")
        continue
    
    decoded_data = decode(np_img)
    if decoded_data:
        print(f"QR code {i+1}: {decoded_data[0].data.decode('utf-8')}")
    else:
        print(f"QR code {i+1}: Decoding failed")
