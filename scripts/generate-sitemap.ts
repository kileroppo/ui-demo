/**
 * Generates sitemap.xml for the UI Style Library.
 * Run: pnpm generate:sitemap
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://ui-styles.example.com'
const TOTAL_STYLES = 76

const staticPages = [
  '/',
  '/styles',
  '/advisor',
  '/workshop',
  '/projects',
  '/timeline',
]

function generateSitemap(): string {
  const urls: string[] = []

  for (const page of staticPages) {
    urls.push(`  <url><loc>${SITE_URL}${page}</loc></url>`)
  }

  for (let id = 1; id <= TOTAL_STYLES; id++) {
    urls.push(`  <url><loc>${SITE_URL}/styles/${id}</loc></url>`)
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

const outDir = resolve(__dirname, '..', 'public')
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

const sitemap = generateSitemap()
writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log(`Sitemap generated with ${staticPages.length + TOTAL_STYLES} URLs -> public/sitemap.xml`)
