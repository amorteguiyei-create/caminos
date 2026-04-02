$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class ImageCropper {
    public static void CropTransparent(string infile, string outfile) {
        Bitmap bmp = new Bitmap(infile);
        
        int xMin = bmp.Width, xMax = 0, yMin = bmp.Height, yMax = 0;
        
        // Find bounds
        for(int y = 0; y < bmp.Height; y++) {
            for(int x = 0; x < bmp.Width; x++) {
                Color c = bmp.GetPixel(x, y);
                if(c.A > 0) {
                    if(x < xMin) xMin = x;
                    if(x > xMax) xMax = x;
                    if(y < yMin) yMin = y;
                    if(y > yMax) yMax = y;
                }
            }
        }
        
        // Add a small 5px padding just to be safe
        xMin = Math.Max(0, xMin - 5);
        yMin = Math.Max(0, yMin - 5);
        xMax = Math.Min(bmp.Width - 1, xMax + 5);
        yMax = Math.Min(bmp.Height - 1, yMax + 5);
        
        Rectangle cropRect = new Rectangle(xMin, yMin, xMax - xMin + 1, yMax - yMin + 1);
        Bitmap cropped = bmp.Clone(cropRect, bmp.PixelFormat);
        
        bmp.Dispose();
        cropped.Save(outfile, ImageFormat.Png);
        cropped.Dispose();
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing
[ImageCropper]::CropTransparent("c:\Users\usuario\Documents\App Yeye\assets\roles\eco_maker_char.png", "c:\Users\usuario\Documents\App Yeye\assets\roles\eco_maker_char.png")
Write-Host "Image successfully cropped to exact visible boundaries!"
