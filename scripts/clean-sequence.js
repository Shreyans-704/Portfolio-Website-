const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '../public/sequence');
const files = fs.readdirSync(sequenceDir).filter(f => f.endsWith('.svg'));

let count = 0;
for (const file of files) {
  const filePath = path.join(sequenceDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  // Remove the <text> ... </text> including content and newlines
  const newContent = content.replace(/<text[\s\S]*?<\/text>/g, '');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    count++;
  }
}

console.log(`Cleaned ${count} SVG files.`);
