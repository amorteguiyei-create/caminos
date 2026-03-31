const fs = require('fs');
const file = "c:\\Users\\usuario\\Documents\\App Yeye\\script.js";
let text = fs.readFileSync(file, 'utf8');

text = text.replace(
    /"<svg class='path-svg' viewBox='0 0 500 " \+ unitHeight \+ "' preserveAspectRatio='none'>" \+/,
    `"<svg class='path-svg' id='svg-" + unit.id + "' viewBox='0 0 500 " + unitHeight + "' preserveAspectRatio='none'>" +
         "<defs><linearGradient id='grad-" + unit.id + "' x1='0' y1='0' x2='0' y2='1'>" +
         "<stop id='stop1-" + unit.id + "' offset='100%' stop-color='rgba(255,255,255,0.7)' />" +
         "<stop id='stop2-" + unit.id + "' offset='100%' stop-color='#81c784' />" +
         "</linearGradient></defs>" +`
);

text = text.replace(
    /"<path d='" \+ pathD \+ "' fill='none' class='track-fg' stroke-width='15' stroke-dasharray='10 20' stroke-linecap='round' \/>" \+/,
    `"<path id='path-" + unit.id + "' d='" + pathD + "' fill='none' class='track-fg' stroke-width='15' stroke-dasharray='10 20' stroke-linecap='round' />" +`
);

fs.writeFileSync(file, text);
console.log("Patch applied!");
