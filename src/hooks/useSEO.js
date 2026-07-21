import { useEffect } from 'react'

export const useSEO = ({ title, description, keywords, canonical, schema, robots, ogImage, ogType }) => {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title
    }

    // 2. Update description meta tag
    let metaDescription = document.querySelector('meta[name="description"]')
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
    }

    // 3. Update keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }

    // 4. Update canonical link tag
    let linkCanonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.setAttribute('href', canonical)
    } else {
      if (linkCanonical) {
        linkCanonical.remove()
      }
    }

    // 5. Update Robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]')
    const robotsVal = robots || 'index, follow'
    if (robotsVal) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta')
        metaRobots.setAttribute('name', 'robots')
        document.head.appendChild(metaRobots)
      }
      metaRobots.setAttribute('content', robotsVal)
    } else {
      if (metaRobots) {
        metaRobots.remove()
      }
    }

    // 6. Update Open Graph Tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (content) {
        if (!tag) {
          tag = document.createElement('meta')
          tag.setAttribute('property', property)
          document.head.appendChild(tag)
        }
        tag.setAttribute('content', content)
      } else if (tag) {
        tag.remove()
      }
    }

    const currentUrl = canonical || window.location.href
    updateOGTag('og:title', title)
    updateOGTag('og:description', description)
    updateOGTag('og:url', currentUrl)
    updateOGTag('og:type', ogType || 'website')
    updateOGTag('og:image', ogImage || 'https://www.hsarchitecturalsolutions.com/company-logo.jpg')

    // 7. Update Twitter Tags
    const updateTwitterTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (content) {
        if (!tag) {
          tag = document.createElement('meta')
          tag.setAttribute('property', property)
          document.head.appendChild(tag)
        }
        tag.setAttribute('content', content)
      } else if (tag) {
        tag.remove()
      }
    }

    updateTwitterTag('twitter:title', title)
    updateTwitterTag('twitter:description', description)
    updateTwitterTag('twitter:url', currentUrl)
    updateTwitterTag('twitter:image', ogImage || 'https://www.hsarchitecturalsolutions.com/company-logo.jpg')

    // 8. Inject / Update JSON-LD schema
    let scriptSchema = document.querySelector('script[type="application/ld+json"]')
    if (schema) {
      if (!scriptSchema) {
        scriptSchema = document.createElement('script')
        scriptSchema.setAttribute('type', 'application/ld+json')
        document.head.appendChild(scriptSchema)
      }
      scriptSchema.textContent = JSON.stringify(schema)
    } else {
      if (scriptSchema) {
        scriptSchema.remove()
      }
    }
  }, [title, description, keywords, canonical, schema, robots, ogImage, ogType])
}

