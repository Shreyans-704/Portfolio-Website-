const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/sequence');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const totalFrames = 100; // Let's make 100 frames for a smooth scroll feel

for (let i = 1; i <= totalFrames; i++) {
  const progress = i / totalFrames;
  // A subtle gradient shifting effect
  const color = `hsl(${progress * 60 + 200}, 50%, 10%)`; 
  
  const content = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}" />
    <text x="50%" y="50%" fill="rgba(255,255,255,0.1)" font-family="sans-serif" font-size="150" font-weight="bold" text-anchor="middle" dominant-baseline="middle">
      FRAME ${i.toString().padStart(3, '0')}
    </text>
    <circle cx="${progress * 1920}" cy="540" r="100" fill="rgba(255,100,50,0.5)" filter="blur(20px)" />
  </svg>`;
  
  const paddedIndex = i.toString().padStart(3, '0');
  fs.writeFileSync(path.join(dir, `${paddedIndex}.svg`), content);
}
console.log(`Generated ${totalFrames} placeholder SVG frames.`);
