
const fs = require('fs');
const content = fs.readFileSync('Advisory.tsx', 'utf8');

const lines = content.split('\n');
let stack = [];
let openDivs = 0;
let closeDivs = 0;

lines.forEach((line, i) => {
    let matches = line.match(/<div|<\/div/g);
    if (matches) {
        matches.forEach(m => {
            if (m === '<div') openDivs++;
            else closeDivs++;
        });
    }
    if (openDivs !== closeDivs) {
        // console.log(`Line ${i + 1}: Open=${openDivs}, Close=${closeDivs}, Diff=${openDivs - closeDivs}`);
    }
});

// Find blocks with unbalanced tags
let currentDiff = 0;
lines.forEach((line, i) => {
    let matches = line.match(/<div|<\/div/g);
    if (matches) {
        matches.forEach(m => {
            if (m === '<div') currentDiff++;
            else currentDiff--;
        });
    }
    if (line.includes('SECTION')) {
        console.log(`At ${line.trim()}: Diff=${currentDiff}`);
    }
});

console.log(`Final Total Open: ${openDivs}, Total Close: ${closeDivs}`);
