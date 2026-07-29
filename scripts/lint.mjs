import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ignoredDirectories = new Set(['.git', 'dist', 'node_modules']);
const checkedExtensions = new Set(['.css', '.json', '.md', '.mjs', '.ts', '.txt']);
const files = [];

function collect(directory) {
  for (const entry of readdirSync(directory)) {
    if (
      ignoredDirectories.has(entry)
      || entry.startsWith('.env')
      || (entry === 'cache' && directory.endsWith('.vitepress'))
    ) {
      continue;
    }

    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      collect(path);
    } else if (checkedExtensions.has(extname(path))) {
      files.push(path);
    }
  }
}

collect(root);

for (const path of files) {
  const content = readFileSync(path, 'utf8');
  const displayPath = relative(root, path);

  if (!content.endsWith('\n')) {
    throw new Error(`${displayPath} must end with a newline.`);
  }

  if (content.includes('\t')) {
    throw new Error(`${displayPath} contains a tab character.`);
  }

  const trailingWhitespaceLine = content.split('\n').findIndex((line) => /\s+$/.test(line));
  if (trailingWhitespaceLine !== -1) {
    throw new Error(`${displayPath}:${trailingWhitespaceLine + 1} has trailing whitespace.`);
  }
}

console.log(`Lint passed for ${files.length} source files.`);
