from PIL import Image, ImageEnhance

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Change all white (also shades of whites)
        # to transparent
        # item is (R, G, B, A)
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    
    # Increase brightness/contrast for dark background
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.5)
    
    img.save(output_path, "PNG")

process_logo("public/logo.jpg", "public/logo.png")
print("Done")
