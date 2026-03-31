$file = "c:\Users\usuario\Documents\App Yeye\script.js"
$content = [System.IO.File]::ReadAllText($file)

$target1 = "<svg class='path-svg' viewBox='0 0 500 "" + unitHeight + ""' preserveAspectRatio='none'>"
$replacement1 = "<svg id='svg-"" + unit.id + ""' class='path-svg' viewBox='0 0 500 "" + unitHeight + ""' preserveAspectRatio='none'>"" +
         ""<defs><linearGradient id='grad-"" + unit.id + ""' x1='0' y1='0' x2='0' y2='1'>"" +
         ""<stop id='stop1-"" + unit.id + ""' offset='100%' stop-color='rgba(255,255,255,0.7)' />"" +
         ""<stop id='stop2-"" + unit.id + ""' offset='100%' stop-color='#81c784' />"" +
         ""</linearGradient></defs>"

$content = $content.Replace($target1, $replacement1)

$target2 = "<path d='"" + pathD + ""' fill='none' class='track-fg'"
$replacement2 = "<path id='path-"" + unit.id + ""' d='"" + pathD + ""' fill='none' class='track-fg'"

$content = $content.Replace($target2, $replacement2)

[System.IO.File]::WriteAllText($file, $content)
Write-Output "Done"
