import { cpSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const target = process.argv[2];

if (target !== 'chrome' && target !== 'firefox') {
  console.error('Usage: tsx scripts/package.ts <chrome|firefox>');
  process.exit(1);
}

const outDir = join('dist', target);

rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'dist', 'popup'), { recursive: true });

for (const asset of ['popup.html', 'options.html', 'icons']) {
  cpSync(asset, join(outDir, asset), { recursive: true });
}

for (const js of ['background.js', 'content.js', 'options.js']) {
  cpSync(join('dist', js), join(outDir, 'dist', js));
}
cpSync(join('dist', 'popup', 'index.js'), join(outDir, 'dist', 'popup', 'index.js'));

const manifestSrc = target === 'firefox' ? 'manifest.firefox.json' : 'manifest.json';
cpSync(manifestSrc, join(outDir, 'manifest.json'));

console.log(`✓ ${target} extension assembled → ${outDir}/`);
