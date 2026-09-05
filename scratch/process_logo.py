import os
from PIL import Image

src_path = r"C:\Users\Atul\.gemini\antigravity-ide\brain\8ba42e1e-b7bb-45f5-a6d0-4163820f9603\.user_uploaded\media_1788596939302.jpg"
out_dir = r"c:\Users\Atul\project\twisp\public\assets"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")
# Convert black background to transparent based on luminance
# In grayscale: 0 is black (alpha 0), 255 is white (alpha 255)
gray = img.convert("L")

# Find bounding box of non-black pixels
bbox = gray.point(lambda p: 255 if p > 30 else 0).getbbox()
print("Bounding box:", bbox)

# Add small padding
pad = 20
w, h = img.size
crop_box = (
    max(0, bbox[0] - pad),
    max(0, bbox[1] - pad),
    min(w, bbox[2] + pad),
    min(h, bbox[3] + pad)
)
cropped = img.crop(crop_box)
cropped_gray = gray.crop(crop_box)

# 1. Transparent White Logo (Alpha = luminance)
white_img = Image.new("RGBA", cropped.size, (255, 255, 255, 0))
r, g, b, a = white_img.split()
# Set alpha based on luminance of original
alpha = cropped_gray.point(lambda p: int(min(255, max(0, (p - 15) * (255 / (240 - 15))))))
white_img.putalpha(alpha)
white_img.save(os.path.join(out_dir, "twisp-logo-white.png"))
print("Saved twisp-logo-white.png", white_img.size)

# 2. Transparent Dark/Charcoal Logo for light surfaces
charcoal_img = Image.new("RGBA", cropped.size, (17, 24, 23, 0))
charcoal_img.putalpha(alpha)
charcoal_img.save(os.path.join(out_dir, "twisp-logo-dark.png"))
print("Saved twisp-logo-dark.png")

# 3. Transparent Emerald Accent Logo (#10B981)
emerald_img = Image.new("RGBA", cropped.size, (16, 185, 129, 0))
emerald_img.putalpha(alpha)
emerald_img.save(os.path.join(out_dir, "twisp-logo-emerald.png"))
print("Saved twisp-logo-emerald.png")

# 4. Also copy original
cropped.save(os.path.join(out_dir, "twisp-logo-badge.png"))
print("Done!")
