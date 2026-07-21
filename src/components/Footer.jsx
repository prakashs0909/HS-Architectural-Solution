import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Building2, CheckCircle2 } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8 px-4 md:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* About Company */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex flex-col">
            <span className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white flex items-center gap-1">
              HS <span className="text-gold-gradient">ARCHITECTURAL</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono -mt-1">
              Solutions
            </span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed mt-2">
            Pioneering manufacturer of decorative GRC and FRP architectural products based in Faridabad, Haryana. Committed to providing premium aesthetics and extreme durability.
          </p>
          <div className="flex flex-col gap-2.5 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <Building2 className="w-4 h-4 text-brand-gold shrink-0" />
              <span>GSTIN: <span className="text-slate-300 font-mono">06GILPK3729P1ZI</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Proprietor: <span className="text-slate-300">Parvendra Kumar</span></span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
            Our Company
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-brand-gold transition-colors">About Us / Profile</Link>
            </li>
            <li>
              <Link to="/our-products" className="hover:text-brand-gold transition-colors">Our Product Range</Link>
            </li>
            <li>
              <Link to="/enquiry" className="hover:text-brand-gold transition-colors">Contact / Send Enquiry</Link>
            </li>
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
            Featured Range
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link to="/our-products?category=grc-jali" className="hover:text-brand-gold transition-colors">GRC Jali & Screens</Link>
            </li>
            <li>
              <Link to="/our-products?category=grc-panel" className="hover:text-brand-gold transition-colors">GRC Cladding Panels</Link>
            </li>
            <li>
              <Link to="/our-products?category=grc-columns" className="hover:text-brand-gold transition-colors">GRC Columns & Capitals</Link>
            </li>
            <li>
              <Link to="/our-products?category=epoxy-resin-table" className="hover:text-brand-gold transition-colors">Epoxy Resin Tables</Link>
            </li>
            <li>
              <Link to="/our-products?category=fiberglass-planter" className="hover:text-brand-gold transition-colors">Fiberglass Planters</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
            Get In Touch
          </h4>
          <ul className="flex flex-col gap-4 text-sm leading-relaxed">
            <li className="flex gap-2.5">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <span>
                Mustli No 137, Khewat No 311/284, Khatauni No 335, Near ACP Farm House, Behind Nayagaon Petrolpump, Nayagaon, Faridabad - 121004, Haryana, India
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a href="tel:07942957964" className="hover:text-brand-gold transition-colors">
                +91 7942957964
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-gold shrink-0" />
              <a href="mailto:kparvendraer@gmail.com" className="hover:text-brand-gold transition-colors font-mono">
                kparvendraer@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {currentYear} HS Architectural Solutions. All rights reserved.</p>
      </div>
    </footer>
  )
}
