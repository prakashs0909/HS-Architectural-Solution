import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const productsFilePath = path.join(__dirname, '../src/data/products.json')
const publicDir = path.join(__dirname, '../public')
const sitemapPath = path.join(publicDir, 'sitemap.xml')
const robotsPath = path.join(publicDir, 'robots.txt')

// Core configurations
const DOMAIN = 'https://www.hsarchitecturalsolutions.com'

const baseRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/profile', priority: '0.8', changefreq: 'weekly' },
  { path: '/our-products', priority: '0.9', changefreq: 'daily' },
  { path: '/enquiry', priority: '0.8', changefreq: 'weekly' }
]

const categories = [
  'grc-jali',
  'grc-panel',
  'grc-planter',
  'grc-columns',
  'grc-cladding',
  'grc-cornice',
  'fiberglass-planter',
  'pedestals-basins',
  'epoxy-resin-table',
  'decorative-ceiling',
  'decorative-statue'
]

function generateSitemap() {
  console.log('Generating sitemap...')

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // 1. Add static base routes
  baseRoutes.forEach(route => {
    xml += `  <url>\n`
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`
    xml += `    <priority>${route.priority}</priority>\n`
    xml += `  </url>\n`
  })

  // 2. Add category filter URLs
  categories.forEach(cat => {
    xml += `  <url>\n`
    xml += `    <loc>${DOMAIN}/our-products?category=${cat}</loc>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `  </url>\n`
  })

  // 3. Add dynamic product details URLs
  try {
    const rawProducts = fs.readFileSync(productsFilePath, 'utf8')
    const products = JSON.parse(rawProducts)

    products.forEach(product => {
      xml += `  <url>\n`
      // Escaping XML special characters just in case product.id has any
      const escapedId = product.id.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
      xml += `    <loc>${DOMAIN}/our-products?product=${escapedId}</loc>\n`
      xml += `    <changefreq>weekly</changefreq>\n`
      xml += `    <priority>0.7</priority>\n`
      xml += `  </url>\n`
    })
    console.log(`Added ${products.length} products to sitemap.`)
  } catch (err) {
    console.error('Error reading products database for sitemap:', err)
  }

  xml += '</urlset>\n'

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Write to public/
  fs.writeFileSync(sitemapPath, xml, 'utf8')
  console.log(`Sitemap written successfully to: ${sitemapPath}`)

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8')
  console.log(`robots.txt written successfully to: ${robotsPath}`)

  // Also write to dist/ if it exists (so they are immediately in the build output)
  const distDir = path.join(__dirname, '../dist')
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml')
    const distRobotsPath = path.join(distDir, 'robots.txt')
    fs.writeFileSync(distSitemapPath, xml, 'utf8')
    fs.writeFileSync(distRobotsPath, robotsTxt, 'utf8')
    console.log(`Copied sitemap.xml and robots.txt to: ${distDir}`)
  }
}

generateSitemap()
