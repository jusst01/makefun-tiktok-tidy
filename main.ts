import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || '.';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || './out';

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
  console.log('Successfully copied VIDEO.json');
} catch (e) {
  console.error('Failed to copy VIDEO.json:', e);
  process.exit(1);
}
