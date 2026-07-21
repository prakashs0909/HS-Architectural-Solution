import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Building } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/profile' },
    { name: 'Our Products', path: '/our-products' },
    { name: 'Enquiry / Contact', path: '/enquiry' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Header Contact Bar */}
      <div className="bg-brand-dark/95 border-b border-white/5 py-2 px-4 md:px-8 text-xs text-slate-400 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-brand-gold" />
            GST No: <strong className="text-slate-300 text-sm font-mono">06GILPK3729P1ZI</strong>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline">Faridabad, Haryana, India</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+918448103775" className="flex items-center gap-1 text-sm hover:text-brand-gold transition-colors">
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            Call: +91 8448103775
          </a>
          <span className="bg-emerald-500/10 text-sm text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
            79% Response Rate
          </span>
        </div>
      </div>

      {/* Main Glassmorphism Navbar */}
      <nav className="w-full glass-panel border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/company-logo.png" 
            alt="HS Architectural Solutions Logo" 
            className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white flex items-center gap-1">
              HS <span className="text-gold-gradient">ARCHITECTURAL</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono -mt-1">
              Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path} className="relative">
              <Link
                to={item.path}
                className={`font-display text-sm font-medium transition-colors hover:text-brand-gold ${
                  isActive(item.path) ? 'text-brand-gold font-semibold' : 'text-slate-300'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-brand-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/enquiry">
            <Button variant="default" size="sm" className="shadow-brand-gold/5">
              Send Enquiry
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-1"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-brand-dark/95 border-b border-white/5 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 border-b border-white/5 font-display text-sm ${
                    isActive(item.path) ? 'text-brand-gold font-bold' : 'text-slate-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2.5 pt-2">
                <Link to="/enquiry" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full">
                    Send Enquiry
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
