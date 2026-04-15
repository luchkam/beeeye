// Собирает проект и склеивает result в самодостаточный root index.html
// (всё JS и CSS встроены инлайном) — чтобы preview-панель Claude Code,
// которая открывает index.html через file://, видела рабочий сайт.
//
// Использование:  npm run inline
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

console.log('▸ vite build…');
execSync('npx vite build', { stdio: 'inherit' });

const distDir = 'dist/assets';
const files = fs.readdirSync(distDir);
const jsFile = files.find((f) => f.endsWith('.js'));
const cssFile = files.find((f) => f.endsWith('.css'));
if (!jsFile || !cssFile) {
  console.error('Не нашёл собранные ассеты в dist/assets');
  process.exit(1);
}

const js = fs.readFileSync(path.join(distDir, jsFile), 'utf8');
const css = fs.readFileSync(path.join(distDir, cssFile), 'utf8');

const html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#060607" />
    <title>BEE EYE — внимание к деталям. AI, Voice AI, сайты и digital-системы</title>
    <meta name="description" content="BEE EYE — разрабатываем AI-агентов, Voice AI, сайты, мессенджер-ботов и автоматизацию для бизнеса. Внимание к деталям." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <style>${css}</style>
  </head>
  <body class="bg-ink-950 text-white antialiased">
    <div id="root"></div>
    <script>${js}</script>
  </body>
</html>
`;

fs.writeFileSync('index.html', html);
console.log(`✓ index.html обновлён · ${(html.length / 1024).toFixed(1)} KB`);
