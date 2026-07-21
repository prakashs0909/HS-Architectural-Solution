import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, RefreshCw, PhoneCall, Send, ChevronUp, ChevronDown } from 'lucide-react'
import productsData from '@/data/products.json'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { useSEO } from '@/hooks/useSEO'
import { Modal } from '@/components/ui/Modal'

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'grc-jali', name: 'GRC Jali' },
  { id: 'grc-panel', name: 'GRC Panel' },
  { id: 'grc-planter', name: 'GRC Planter' },
  { id: 'grc-columns', name: 'GRC Columns' },
  { id: 'grc-cladding', name: 'GRC Cladding' },
  { id: 'grc-cornice', name: 'GRC Cornice' },
  { id: 'fiberglass-planter', name: 'Fiberglass Planter' },
  { id: 'pedestals-basins', name: 'Pedestals Basins' },
  { id: 'epoxy-resin-table', name: 'Epoxy Resin Table' },
  { id: 'decorative-ceiling', name: 'Decorative Ceiling' },
  { id: 'decorative-statue', name: 'Decorative Statue' }
]

export const OurProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Modal specific state inside the page component
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  const activeProductId = searchParams.get('product')
  const activeProduct = productsData.find(p => p.id === activeProductId)

  // Reset active image when product changes
  useEffect(() => {
    setActiveImgIndex(0)
    setTouchStartX(null)
    setTouchEndX(null)
  }, [activeProductId])

  const categoryLabels = {
    'grc-jali': 'GRC Jali',
    'grc-panel': 'GRC Panel',
    'grc-planter': 'GRC Planter',
    'grc-columns': 'GRC Columns',
    'grc-cladding': 'GRC Cladding',
    'grc-cornice': 'GRC Cornice',
    'fiberglass-planter': 'Fiberglass Planter',
    'pedestals-basins': 'Pedestals Basins',
    'epoxy-resin-table': 'Epoxy Resin Table',
    'decorative-ceiling': 'Decorative Ceiling',
    'decorative-statue': 'Decorative Statue',
  }

  // Schema for the entire items list
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'HS Architectural Solutions Product Catalog',
    'url': 'https://www.hsarchitecturalsolutions.com/our-products',
    'numberOfItems': productsData.length,
    'itemListElement': productsData.map((p, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'Product',
        'name': p.name,
        'description': p.description,
        'image': `https://www.hsarchitecturalsolutions.com${p.image}`,
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'INR',
          'price': p.price.includes('/') ? parseFloat(p.price.replace(/[^\d.]/g, '')) || 0 : 0,
          'availability': 'https://schema.org/InStock',
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'price': p.price.includes('/') ? parseFloat(p.price.replace(/[^\d.]/g, '')) || 0 : 0,
            'priceCurrency': 'INR',
            'unitText': p.price.includes('/') ? p.price.split('/').pop().trim() : 'Piece'
          }
        }
      }
    }))
  }

  // Schema for the active product details
  const activeProductSchema = activeProduct ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': activeProduct.name,
    'description': activeProduct.description,
    'image': `https://www.hsarchitecturalsolutions.com${activeProduct.image}`,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': activeProduct.price && activeProduct.price.includes('/') ? parseFloat(activeProduct.price.replace(/[^\d.]/g, '')) || 0 : 0,
      'availability': 'https://schema.org/InStock',
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': activeProduct.price && activeProduct.price.includes('/') ? parseFloat(activeProduct.price.replace(/[^\d.]/g, '')) || 0 : 0,
        'priceCurrency': 'INR',
        'unitText': activeProduct.price && activeProduct.price.includes('/') ? activeProduct.price.split('/').pop().trim() : 'Piece'
      }
    }
  } : null

  // Dynamic SEO configurations
  const pageTitle = activeProduct
    ? `${activeProduct.name} | GRC & FRP Manufacturer | HS Architectural Solutions`
    : 'Buy GRC Jali, Columns, Cladding & Planters Online | HS Architectural Solutions'

  const pageDescription = activeProduct
    ? `${activeProduct.name} - ${activeProduct.description}`
    : 'Explore our premium catalog of high-strength GRC screens, panels, garden planters, classical Doric/Ionic columns, fiberglass flowerpots, and epoxy tables.'

  const pageKeywords = activeProduct
    ? `${activeProduct.name}, buy ${activeProduct.name}, GRC, FRP, Faridabad, cladding, columns`
    : 'Buy GRC Jali online, GRC cladding price, fiberglass planters, decorative GRC columns, custom concrete balustrade'

  const pageCanonical = activeProduct
    ? `https://www.hsarchitecturalsolutions.com/our-products?product=${activeProduct.id}`
    : 'https://www.hsarchitecturalsolutions.com/our-products'

  useSEO({
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    canonical: pageCanonical,
    schema: activeProduct ? activeProductSchema : itemListSchema,
    ogImage: activeProduct ? `https://www.hsarchitecturalsolutions.com${activeProduct.image}` : null
  })

  // Sync state with query parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const match = CATEGORIES.find(cat => cat.id === categoryParam)
      if (match) {
        setSelectedCategory(categoryParam)
      }
    } else {
      setSelectedCategory('all')
    }
  }, [searchParams])

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId)
    if (catId === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', catId)
    }
    setSearchParams(searchParams)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    handleCategoryChange('all')
  }

  // Filter products by category and query
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.features && product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())))
    
    return matchesCategory && matchesSearch
  })

  // Modal Handlers
  const handleCloseModal = () => {
    searchParams.delete('product')
    setSearchParams(searchParams)
  }

  const handleTouchStart = (e) => {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (thumbnails) => {
    if (touchStartX === null || touchEndX === null) return
    const distance = touchStartX - touchEndX
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swiped left (next image)
      setActiveImgIndex((prev) => Math.min(thumbnails.length - 1, prev + 1))
    } else if (distance < -minSwipeDistance) {
      // Swiped right (previous image)
      setActiveImgIndex((prev) => Math.max(0, prev - 1))
    }
  }

  return (
    <div className="flex flex-col min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Page Title */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 block font-mono">
          Exquisite Casting Range
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-display text-white">
          Our Product Catalog
        </h1>
        <div className="w-16 h-[2px] bg-brand-gold mx-auto mt-4" />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Pane (Desktop) */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-xl border border-white/5 sticky top-28">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
            <Filter className="w-4 h-4 text-brand-gold" />
            <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
              Filter Categories
            </h3>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-auto lg:w-full text-left px-4 py-2.5 rounded-lg text-xs font-display font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-brand-gold text-brand-dark font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 lg:border-none'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Catalog View */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, specifications, material (GRC, wood, etc.)..."
              className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl text-sm"
            />
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredProducts.length}</strong> items in{' '}
              <strong className="text-white">
                {CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
              </strong>
            </span>

            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-brand-gold hover:text-brand-goldDark transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Reset Filters
              </button>
            )}
          </div>

          {/* Grid display */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="glass-panel p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center gap-4">
              <span className="text-slate-550 font-mono text-xs">NO PRODUCTS FOUND</span>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                We couldn't find any products matching your search query. Try choosing another category or clearing search filter keywords.
              </p>
              <Button variant="default" size="sm" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Global Product Specifications Modal */}
      <AnimatePresence>
        {activeProduct && (
          (() => {
            const imageUrl = activeProduct.image || '/images/grc_panel.png'
            const categoryLabel = categoryLabels[activeProduct.category] || activeProduct.category
            const rawImages = activeProduct.images || [imageUrl]
            const thumbnails = rawImages.filter(
              (img) => rawImages.length <= 1 || !img.match(/-thumb\.(jpe?g|jpg|png)$/i)
            )
            const activeImg = thumbnails[activeImgIndex] || imageUrl
            const specs = activeProduct.specifications || {}

            return (
              <Modal 
                isOpen={true} 
                onClose={handleCloseModal}
                className="max-w-5xl w-full p-6 sm:p-8 bg-brand-dark/95 border-white/10"
              >
                <div className="flex flex-col gap-6">
                  {/* Modal Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1 block">
                        {categoryLabel}
                      </span>
                      <h2 className="text-2xl font-bold font-display text-white">{activeProduct.name}</h2>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <a href="tel:+918448103775" className="inline-block">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1.5 border-brand-gold/55 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 uppercase tracking-wider"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          Request a Call Back
                        </Button>
                      </a>
                      
                      <Link to={`/enquiry?product=${activeProduct.id}&category=${activeProduct.category}`} className="inline-block">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex items-center gap-1.5 bg-brand-gold text-brand-dark hover:bg-brand-gold/90 transition-all text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-lg shadow-brand-gold/10"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send Query
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Modal Content Split Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Image Gallery with Thumbnail Track */}
                    <div className="lg:col-span-6 flex flex-col lg:flex-row gap-4 w-full">
                      {/* Vertical Thumbnail Track (Desktop Only) */}
                      <div className="hidden lg:flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => setActiveImgIndex(prev => Math.max(0, prev - 1))}
                          disabled={activeImgIndex === 0}
                          className="p-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                          <ChevronUp className="w-4 h-4 text-slate-300" />
                        </button>
                        
                        <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto no-scrollbar">
                          {thumbnails.map((thumb, idx) => (
                            <div
                              key={idx}
                              onClick={() => setActiveImgIndex(idx)}
                              className={`w-14 h-14 rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 ${
                                activeImgIndex === idx
                                  ? 'border-brand-gold ring-1 ring-brand-gold scale-[1.03]'
                                  : 'border-white/5 hover:border-white/20'
                              }`}
                            >
                              <img src={thumb} className="w-full h-full object-cover" alt="" />
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => setActiveImgIndex(prev => Math.min(thumbnails.length - 1, prev + 1))}
                          disabled={activeImgIndex === thumbnails.length - 1}
                          className="p-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                          <ChevronDown className="w-4 h-4 text-slate-300" />
                        </button>
                      </div>

                      {/* Main Display Image */}
                      <div 
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={() => handleTouchEnd(thumbnails)}
                        className="flex-grow aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-brand-charcoal/30 shadow-2xl relative w-full cursor-grab active:cursor-grabbing select-none"
                      >
                        <img 
                          src={activeImg} 
                          className="w-full h-full object-cover transition-all duration-500 pointer-events-none" 
                          alt={activeProduct.name} 
                        />
                      </div>

                      {/* Pagination Dots (Mobile Only) */}
                      <div className="flex lg:hidden justify-center gap-2 mt-2">
                        {thumbnails.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImgIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                              activeImgIndex === idx
                                ? 'bg-brand-gold w-6'
                                : 'bg-white/20 hover:bg-white/35'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Pricing & Specifications Table */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                      {/* Price Segment */}
                      <div className="flex items-baseline gap-2 pb-3 border-b border-white/5">
                        <span className="text-xl font-bold font-mono text-white">
                          {activeProduct.price || 'Price on Request'}
                        </span>
                      </div>

                      {/* Technical Specifications Table */}
                      <div className="border border-white/5 rounded-lg overflow-hidden bg-black/20">
                        <table className="w-full text-[11px] sm:text-xs text-left">
                          <tbody>
                            {Object.entries(specs).map(([key, val], idx) => (
                              <tr
                                key={key}
                                className={`border-b border-white/5 last:border-b-0 ${
                                  idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                                }`}
                              >
                                <td className="px-4 py-2 font-medium text-slate-400 border-r border-white/5 w-1/3">
                                  {key}
                                </td>
                                <td className="px-4 py-2 text-slate-200 font-semibold">{val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Description Segment */}
                      <div className="text-xs text-slate-400 leading-relaxed border-l-2 border-brand-gold/70 pl-3 py-1 font-sans italic bg-white/[0.01] rounded-r-md">
                        {activeProduct.description}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 mt-2">
                    <span className="text-[10px] text-slate-500 font-mono">
                      * Custom designs, drawing layouts, and sizing specifications are welcome.
                    </span>
                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                      <Button 
                        variant="outline" 
                        onClick={handleCloseModal} 
                        className="w-full sm:w-auto text-xs py-2 px-4"
                      >
                        Close
                      </Button>
                      <Link to={`/enquiry?product=${activeProduct.id}&category=${activeProduct.category}`} className="w-full sm:w-auto">
                        <Button 
                          variant="default" 
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-gold text-brand-dark hover:bg-brand-gold/90 font-bold text-xs uppercase tracking-wider py-2.5 px-6 shadow-lg shadow-brand-gold/10"
                        >
                          <Send className="w-4 h-4" />
                          Get Best Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Modal>
            )
          })()
        )}
      </AnimatePresence>
    </div>
  )
}
