#!/usr/bin/env node

/**
 * Quick comparison script to run visual and functional tests
 * Usage: node tests/run-comparison.js [--visual-only] [--functional-only]
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const visualOnly = args.includes('--visual-only');
const functionalOnly = args.includes('--functional-only');

console.log('🚀 Starting comparison tests...\n');

// Check if local server is running
try {
  console.log('Checking if local dev server is running...');
  execSync('curl -s http://localhost:3000 > /dev/null', { stdio: 'ignore' });
  console.log('✓ Local dev server is running\n');
} catch (error) {
  console.error('✗ Local dev server is not running!');
  console.error('Please start it with: npm run dev\n');
  process.exit(1);
}

// Run tests
try {
  if (visualOnly) {
    console.log('Running visual comparison tests only...\n');
    execSync('npx playwright test tests/visual-comparison.spec.js', { 
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
  } else if (functionalOnly) {
    console.log('Running functional comparison tests only...\n');
    execSync('npx playwright test tests/functional-comparison.spec.js', { 
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
  } else {
    console.log('Running all comparison tests...\n');
    execSync('npx playwright test', { 
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
  }

  console.log('\n✅ Tests completed!');
  console.log('📊 View report: npm run test:report');
  console.log('📸 Screenshots saved in: test-results/screenshots/');
  console.log('🔍 Comparisons saved in: test-results/comparisons/');
} catch (error) {
  console.error('\n❌ Tests failed!');
  console.error('Check test-results/ for details');
  process.exit(1);
}

