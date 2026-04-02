$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ImageProcessor {
    public static void RemoveWhiteBackground(string infile, string outfile) {
        Bitmap bmp = new Bitmap(infile);
        
        // Lock bitmap bits for fast processing
        Rectangle rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
        BitmapData bmpData = bmp.LockBits(rect, ImageLockMode.ReadWrite, bmp.PixelFormat);
        
        int bytes = Math.Abs(bmpData.Stride) * bmp.Height;
        byte[] rgbValues = new byte[bytes];
        Marshal.Copy(bmpData.Scan0, rgbValues, 0, bytes);
        
        int bytesPerPixel = Bitmap.GetPixelFormatSize(bmp.PixelFormat) / 8;
        
        for (int counter = 0; counter < rgbValues.Length; counter += bytesPerPixel) {
            byte b = rgbValues[counter];
            byte g = rgbValues[counter + 1];
            byte r = rgbValues[counter + 2];
            
            // If pixel is close to white (e.g. > 230 for R, G, B)
            if (r > 230 && g > 230 && b > 230 && bytesPerPixel == 4) {
                rgbValues[counter + 3] = 0; // Set alpha to 0 (transparent)
            }
        }
        
        Marshal.Copy(rgbValues, 0, bmpData.Scan0, bytes);
        bmp.UnlockBits(bmpData);
        
        bmp.Save(outfile, ImageFormat.Png);
        bmp.Dispose();
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing
[ImageProcessor]::RemoveWhiteBackground("C:\Users\usuario\.gemini\antigravity\brain\99f4f99d-d0e2-44ec-ad30-4fcdab0b4e11\eco_maker_char_v2_1775141290466.png", "c:\Users\usuario\Documents\App Yeye\assets\roles\eco_maker_char.png")
Write-Host "Background cleanly removed using C# pixel manipulation!"
