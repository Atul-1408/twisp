import os
from PIL import Image

out_dir = r"c:\Users\Atul\project\twisp\public\assets"
white_img = Image.open(os.path.join(out_dir, "twisp-logo-white.png"))
w, h = white_img.size

# Create accent version with emerald dot
accent_img = white_img.copy()
pix = accent_img.load()

# The dot of the 'i' is located at top-center
# Let's find the circle bounding box in top region (y < h * 0.35, x between w * 0.45 and w * 0.6)
for y in range(int(h * 0.35)):
    for x in range(int(w * 0.42), int(w * 0.62)):
        r, g, b, a = pix[x, y]
        if a > 30:
            # Color it with #10B981 (16, 185, 129)
            pix[x, y] = (16, 185, 129, a)

accent_img.save(os.path.join(out_dir, "twisp-logo-accent.png"))
print("Saved twisp-logo-accent.png")

# Also create high-res favicon from the dot + 't' or monogram
icon = Image.new("RGBA", (128, 128), (6, 59, 43, 255))
# draw circular emblem or crop
white_thumb = accent_img.resize((110, int(110 * h / w)), Image.Resampling.LANCZOS)
tw, th = white_thumb.size
icon.paste(white_thumb, ((128 - tw) // 2, (128 - th) // 2), white_thumb)
icon.save(os.path.join(out_dir, "favicon.png"))
print("Saved favicon.png")
