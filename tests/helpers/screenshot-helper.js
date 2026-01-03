import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Optional dependencies for advanced comparison
let pixelmatch, PNG;
try {
  pixelmatch = (await import('pixelmatch')).default;
  PNG = (await import('pngjs')).PNG;
} catch (e) {
  console.warn('pixelmatch/pngjs not installed. Advanced comparison disabled.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOT_DIR = path.join(__dirname, '../../test-results/screenshots');
const COMPARISON_DIR = path.join(__dirname, '../../test-results/comparisons');

// Ensure directories exist
[SCREENSHOT_DIR, COMPARISON_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Compare two screenshots and return similarity metrics
 */
export async function compareScreenshots(prodScreenshot, localScreenshot, testName) {
  if (!pixelmatch || !PNG) {
    return {
      similarity: 0.5,
      difference: 0.5,
      numDiffPixels: 0,
      totalPixels: 0,
      error: 'pixelmatch not available'
    };
  }
  
  try {
    const prodImg = PNG.sync.read(prodScreenshot);
    const localImg = PNG.sync.read(localScreenshot);

    // Resize if dimensions don't match
    let width = Math.max(prodImg.width, localImg.width);
    let height = Math.max(prodImg.height, localImg.height);

    if (prodImg.width !== localImg.width || prodImg.height !== localImg.height) {
      // Resize images to match (simple approach - in production, use proper image resizing)
      console.warn(`⚠ Image dimensions don't match: prod(${prodImg.width}x${prodImg.height}) vs local(${localImg.width}x${localImg.height})`);
    }

    const diff = new PNG({ width, height });
    const numDiffPixels = pixelmatch(
      prodImg.data,
      localImg.data,
      diff.data,
      width,
      height,
      {
        threshold: 0.1,
        alpha: 0.1,
        diffColor: [255, 0, 0],
        diffColorAlt: [0, 0, 255]
      }
    );

    const totalPixels = width * height;
    const similarity = 1 - (numDiffPixels / totalPixels);
    const difference = numDiffPixels / totalPixels;

    // Save diff image
    const diffPath = path.join(COMPARISON_DIR, `${testName}-diff.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    return {
      similarity,
      difference,
      numDiffPixels,
      totalPixels,
      diffPath
    };
  } catch (error) {
    console.error('Error comparing screenshots:', error);
    return {
      similarity: 0,
      difference: 1,
      numDiffPixels: 0,
      totalPixels: 0,
      error: error.message
    };
  }
}

/**
 * Save a screenshot to disk
 */
export async function takeScreenshot(screenshot, filename) {
  const filePath = path.join(SCREENSHOT_DIR, filename);
  fs.writeFileSync(filePath, screenshot);
  return filePath;
}

/**
 * Generate comparison report
 */
export function generateReport(results) {
  const reportPath = path.join(__dirname, '../../test-results/comparison-report.html');
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Comparison Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .pass { color: green; }
    .fail { color: red; }
    .warning { color: orange; }
  </style>
</head>
<body>
  <h1>Visual Comparison Report</h1>
  <table>
    <tr>
      <th>Page</th>
      <th>Viewport</th>
      <th>Similarity</th>
      <th>Difference</th>
      <th>Status</th>
    </tr>
    ${results.map(r => `
      <tr>
        <td>${r.page}</td>
        <td>${r.viewport}</td>
        <td>${(r.similarity * 100).toFixed(2)}%</td>
        <td>${(r.difference * 100).toFixed(2)}%</td>
        <td class="${r.difference < 0.15 ? 'pass' : 'fail'}">
          ${r.difference < 0.15 ? '✓ PASS' : '✗ FAIL'}
        </td>
      </tr>
    `).join('')}
  </table>
</body>
</html>
  `;

  fs.writeFileSync(reportPath, html);
  return reportPath;
}

