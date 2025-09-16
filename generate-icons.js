const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create a simple shop icon SVG
const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  <path d="M128 160L256 80L384 160L384 240L352 256L352 416L160 416L160 256L128 240Z" fill="white" opacity="0.9"/>
  <path d="M128 160L384 160L368 200L144 200Z" fill="white"/>
  <circle cx="200" cy="360" r="16" fill="#6366f1"/>
  <circle cx="312" cy="360" r="16" fill="#6366f1"/>
  <path d="M180 320L332 320" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
</svg>`;

// Generate icons
async function generateIcons() {
  try {
    // Generate 192x192 icon
    await sharp(Buffer.from(iconSvg))
      .resize(192, 192)
      .png()
      .toFile(path.join(iconsDir, 'icon-192x192.png'));

    // Generate 512x512 icon
    await sharp(Buffer.from(iconSvg))
      .resize(512, 512)
      .png()
      .toFile(path.join(iconsDir, 'icon-512x512.png'));

    // Generate favicon
    await sharp(Buffer.from(iconSvg))
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon.png'));

    console.log('✅ PWA icons generated successfully!');
    console.log('   - public/icons/icon-192x192.png');
    console.log('   - public/icons/icon-512x512.png');
    console.log('   - public/favicon.png');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();