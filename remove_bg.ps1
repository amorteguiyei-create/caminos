Add-Type -AssemblyName System.Drawing
$inputFile = "C:\Users\usuario\.gemini\antigravity\brain\99f4f99d-d0e2-44ec-ad30-4fcdab0b4e11\eco_maker_char_v2_1775141290466.png"
$outputFile = "c:\Users\usuario\Documents\App Yeye\assets\roles\eco_maker_char.png"

$img = [System.Drawing.Image]::FromFile($inputFile)
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()

# Find the color of the top-left pixel to use as transparency key (probably white)
$transparentColor = $bmp.GetPixel(0,0)
$bmp.MakeTransparent($transparentColor)

$bmp.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Background removed!"
