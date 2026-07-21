import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ClipboardList, Send } from 'lucide-react'
import { Button } from './ui/Button'

export const ProductCard = ({ product }) => {
  const [searchParams, setSearchParams] = useSearchParams()

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

  const imageUrl = product.image || '/images/grc_panel.png'
  const categoryLabel = categoryLabels[product.category] || product.category

  const handleOpenProduct = () => {
    searchParams.set('product', product.id)
    setSearchParams(searchParams)
  }

  return (
    <motion.div
      layout
      className="glass-card rounded-xl overflow-hidden flex flex-col h-full border border-white/5"
    >
      {/* Product Image */}
      <div 
        onClick={handleOpenProduct}
        className="relative h-56 overflow-hidden bg-brand-charcoal/50 group cursor-pointer border-b border-white/5"
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-brand-gold">
          {categoryLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 
          onClick={handleOpenProduct}
          className="text-lg font-bold text-white mb-2 leading-snug font-display cursor-pointer hover:text-brand-gold transition-colors duration-200"
        >
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
          {product.description}
        </p>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.features.slice(0, 3).map((feat, index) => (
              <span
                key={index}
                className="bg-brand-charcoal text-slate-300 text-[10px] px-2 py-0.5 rounded flex items-center gap-1 border border-white/5"
              >
                <Check className="w-2.5 h-2.5 text-brand-gold" />
                {feat}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenProduct}
            className="flex items-center gap-1.5 py-2 text-xs"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Specs
          </Button>
          <Link to={`/enquiry?product=${product.id}&category=${product.category}`}>
            <Button
              variant="default"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold"
            >
              <Send className="w-3.5 h-3.5" />
              Enquire
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
