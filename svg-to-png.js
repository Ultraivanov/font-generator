const fs = require('fs');
const path = require('path');

// Simple SVG to PNG conversion using canvas
const { createCanvas, loadImage } = require('canvas');

async function convertSVGtoPNG(svgPath, pngPath, width = 800, height = 800) {
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  
  // Parse and draw SVG path manually
  const pathMatch = svgContent.match(/d="([^"]+)"/);
  if (pathMatch) {
    const pathData = pathMatch[1];
    
    // Create Path2D
    const p = new (require('canvas').Path2D)(pathData);
    
    // Apply transform: translate(50, 700) scale(1, -1)
    ctx.save();
    ctx.translate(50, 700);
    ctx.scale(1, -1);
    
    ctx.fillStyle = 'black';
    ctx.fill(p);
    ctx.restore();
  }
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(pngPath, buffer);
  
  console.log(`✓ Generated ${pngPath}`);
}

convertSVGtoPNG('test-R.svg', 'test-R.png').catch(console.error);
