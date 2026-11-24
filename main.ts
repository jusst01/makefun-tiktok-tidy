import { copyFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || '.';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || './out';

try {
  const videoPath = join(BOT_DIR, 'VIDEO.json');

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(readFileSync(videoPath, 'utf8'));
  } catch (e) {
    console.error(`Invalid VIDEO.json at ${videoPath}: could not read or parse it as JSON.`);
    process.exit(1);
  }

  const url =
    parsed !== null && typeof parsed === 'object'
      ? (parsed as Record<string, unknown>).url
      : undefined;

  if (typeof url !== 'string' || !url.startsWith('https://')) {
    console.error(
      `Invalid VIDEO.json at ${videoPath}: expected a "url" field whose value is a string starting with https://.`
    );
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(videoPath, join(OUTPUT_DIR, 'VIDEO.json'));
  console.log('Successfully copied VIDEO.json');
} catch (e) {
  console.error('Failed to copy VIDEO.json:', e);
  process.exit(1);
}
