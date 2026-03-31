import sys
import os

try:
    import fitz
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyMuPDF"])
    import fitz

pdf_path = r"c:\Users\usuario\Downloads\3 LOGOS CEES.pdf"
out_path = r"c:\Users\usuario\Documents\App Yeye\logo.png"

try:
    doc = fitz.open(pdf_path)
    page = doc[0]
    
    # Try to extract the first image found on the page
    image_list = page.get_images()
    
    if image_list:
        xref = image_list[0][0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        with open(out_path, "wb") as f:
            f.write(image_bytes)
        print("Image extracted from PDF objects.")
    else:
        # If no explicit image objects (e.g. vector graphic or flattened PDF), render the page
        pix = page.get_pixmap(dpi=300, alpha=True)
        pix.save(out_path)
        print("Page rendered to image.")
except Exception as e:
    print(f"Error processing PDF: {e}")
