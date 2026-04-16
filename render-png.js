const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function renderSVGtoPNG() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Load SVG file
  const svgPath = path.join(__dirname, 'test-R.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  
  // Create HTML wrapper
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: white; }
        svg { display: block; }
      </style>
    </head>
    <body>
      ${svgContent}
    </body>
    </html>
  `;
  
  await page.setContent(html);
  await page.setViewportSize({ width: 800, height: 800 });
  
  // Take screenshot
  await page.screenshot({
    path: 'test-R.png',
    fullPage: false
  });
  
  await browser.close();
  console.log('✓ Generated test-R.png (800x800px)');
}

renderSVGtoPNG().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
