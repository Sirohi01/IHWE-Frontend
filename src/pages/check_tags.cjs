
const fs = require('fs');
const content = fs.readFileSync('Advisory.tsx', 'utf8');

let stack = [];
let tags = content.match(/<div|<\/div|<|>/g);

let openDivs = 0;
let closeDivs = 0;

const lines = content.split('\n');
lines.forEach((line, i) => {
    let matches = line.match(/<div|<\/div/g);
    if (matches) {
        matches.forEach(m => {
            if (m === '<div') openDivs++;
            else closeDivs++;
        });
    }
    if (openDivs !== closeDivs) {
        // console.log(`Line ${i + 1}: diff ${openDivs - closeDivs}`);
    }
});

console.log(`Total Open: ${openDivs}, Total Close: ${closeDivs}`);
 