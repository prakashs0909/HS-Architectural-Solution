import React from 'react'
import { Link } from 'react-router-dom'
import { Award, ThumbsUp, Briefcase, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useSEO } from '@/hooks/useSEO'

export const Profile = () => {
  useSEO({
    title: 'About Us | HS Architectural Solutions - GRC Manufacturer in Faridabad',
    description: 'Established in 2022, HS Architectural Solutions is a certified manufacturer of GFRC & FRP casting products. Learn about our infrastructure, quality control, and client projects.',
    keywords: 'About HS Architectural Solutions, GRC manufacturer Haryana, precast concrete company Faridabad, FRP casting factory',
    canonical: 'https://www.hsarchitecturalsolutions.com/profile',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About HS Architectural Solutions',
      'description': 'Established in 2022, HS Architectural Solutions is a certified manufacturer of GFRC & FRP casting products.',
      'mainEntity': {
        '@type': 'LocalBusiness',
        'name': 'HS Architectural Solutions',
        'url': 'https://www.hsarchitecturalsolutions.com/'
      }
    }
  })

  const [activeAlbum, setActiveAlbum] = React.useState('Manufacturing Unit')
  const [selectedImage, setSelectedImage] = React.useState(null)

  const companyAlbums = [
    {
      title: 'Manufacturing Unit',
      coverImage: '/images/manuf-unit.jpeg',
      images: [
        { src: '/images/manuf-unit.jpeg', alt: 'Manufacturing Yard Overview' },
        { src: '/images/manuf-unit1.jpeg', alt: 'Casting Columns & Molds' }
      ]
    },
    {
      title: 'Infrastructure & Manufacturing Facilities',
      coverImage: '/images/infra-manu.jpeg',
      images: [
        { src: '/images/infra-manu.jpeg', alt: 'Facility Yard View with Geolocation' },
      ]
    },
    {
      title: 'Infrastructural Set-Up',
      coverImage: '/images/infrastructural-setup.jpeg',
      images: [
        { src: '/images/infrastructural-setup.jpeg', alt: 'Factory Administration Office Setup' },
      ]
    },
    {
      title: 'Our Warehouse',
      coverImage: '/images/warehouse.jpg',
      images: [
        { src: '/images/warehouse.jpg', alt: 'GRC Column & Panel Storage Yard' },
        { src: '/images/warehouse1.jpeg', alt: 'Raw Materials Storage' }
      ]
    }
  ]

  const currentAlbum = companyAlbums.find(album => album.title === activeAlbum) || companyAlbums[0]

  const profileDetails = [
    { label: 'Legal Status of Firm', value: 'Sole Proprietorship' },
    { label: 'Nature of Business', value: 'Manufacturer, Trader, Wholesaler' },
    { label: 'Year of Establishment', value: '2021' },
    { label: 'Total Number of Employees', value: '11 to 25 People' },
    { label: 'Annual Turnover', value: 'Rs. 1.5 - 5 Crore' },
    { label: 'GSTIN Number', value: '06GILPK3729P1ZI' },
    { label: 'Import Export Code (IEC)', value: 'GILPK3729P' },
    { label: 'Key Contact Person', value: 'Parvendra Kumar' },
    { label: 'Primary Payment Modes', value: 'Cash, DD, Bank Transfer, Cheque' },
    { label: 'Factory Location', value: 'Nayagaon, Faridabad, Haryana' }
  ]

  const corporateValues = [
    {
      title: 'Precision Crafting',
      desc: 'Using exact computer-carved CNC templates to produce fiberglass composite molds with flawless tolerances.',
      icon: Briefcase
    },
    {
      title: 'A-Grade Material',
      desc: 'Alkali-Resistant (AR) glass fibers and premium silica sands mixed for high-density, weather-durable items.',
      icon: Award
    },
    {
      title: 'Professional Service',
      desc: 'Timely supply scheduling, safe wooden crate wrapping, and client installation support for building elevations.',
      icon: ThumbsUp
    }
  ]

  return (
    <div className="flex flex-col min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 block font-mono">
          Corporate Profile
        </span>
        <h1 className="text-4xl md:text-6xl font-bold font-display text-white">
          About HS Architectural Solutions
        </h1>
        <div className="w-20 h-[2px] bg-brand-gold mx-auto mt-4" />
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Profile Statement */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white border-b border-white/5 pb-3">
            Our Architectural Vision
          </h2>
          <p className="text-sm text-slate-350 leading-relaxed">
            HS Architectural Solutions, headquartered in Faridabad, Haryana, is a distinguished manufacturer, supplier, and wholesaler of decorative building facade elements. We construct Glassfibre Reinforced Concrete (GRC) and Fiberglass Reinforced Polymer (FRP) items for modern building fronts, bungalows, grand entry gates, and luxury offices.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Our manufacturing facility houses advanced mold development and casting chambers where master craftsmen shape limestone mixtures and AR glass fibers. By reinforcing concrete with high-grade synthetic fibers, we produce components that are one-fifth the weight of traditional concrete, while boasting three times the flexural and tensile strength.
          </p>
          <p className="text-sm italic border-l-2 border-brand-gold pl-4 text-slate-300 font-sans">
            "We strive to blend structural reliability with outstanding aesthetics, enabling builders and designers to execute complicated designs with ease."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {corporateValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col">
                  <Icon className="w-6 h-6 text-brand-gold mb-3 shrink-0" />
                  <h4 className="font-semibold text-white text-sm mb-1.5 font-display">{value.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Fact Sheet Table */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-2.5 font-display">
            Company Fact Sheet
          </h3>

          <div className="flex flex-col gap-4 text-xs">
            {profileDetails.map((detail, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-b-0"
              >
                <span className="text-slate-400 font-medium">{detail.label}</span>
                <span className="text-slate-200 font-semibold text-right max-w-[60%]">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left mt-8">
        <div>
          <h3 className="text-xl font-bold font-display text-white mb-2">Have a Custom Project or Casting Requirement?</h3>
          <p className="text-xs text-slate-400">Share your blueprints and sizing requirements with our casting engineers.</p>
        </div>
        <Link to="/enquiry">
          <Button variant="default" className="whitespace-nowrap">
            Get Project Quote
          </Button>
        </Link>
      </div>

      {/* Company Album Segment */}
      <section className="py-12 border-t border-white/5 mb-8">
        <h3 className="text-2xl font-bold font-display text-white mb-8 border-b border-white/5 pb-3">
          Company Album
        </h3>
        
        {/* Album Category Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {companyAlbums.map((album, index) => {
            const isActive = activeAlbum === album.title
            return (
              <div
                key={index}
                onClick={() => setActiveAlbum(album.title)}
                className={`group glass-panel rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${
                  isActive 
                    ? 'border-brand-gold ring-1 ring-brand-gold bg-brand-charcoal/45 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                    : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {/* Card Cover Image */}
                <div className="aspect-video w-full overflow-hidden relative border-b border-white/5">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
                  )}
                </div>
                {/* Card Title */}
                <div className="p-4 flex items-center justify-center flex-1 text-center min-h-[72px]">
                  <span className={`text-xs font-semibold uppercase tracking-wider font-display transition-colors duration-200 ${
                    isActive ? 'text-brand-gold' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {album.title}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Album Gallery Title */}
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-lg font-bold font-display text-white border-l-2 border-brand-gold pl-3">
            {activeAlbum}
          </h4>
          <span className="text-[11px] text-slate-500 font-medium font-mono uppercase">
            {currentAlbum.images.length} Photos
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentAlbum.images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-video w-full glass-panel overflow-hidden border border-white/5 rounded-xl cursor-pointer hover:border-brand-gold/30 transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 bg-brand-charcoal/90 border border-white/10 p-3 rounded-full text-brand-gold flex items-center gap-1.5 shadow-xl">
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold font-mono">View Large</span>
                </div>
              </div>
              {/* Photo Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors duration-200">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="max-w-4xl p-2 bg-black/95 border-white/10"
      >
        {selectedImage && (
          <div className="relative flex flex-col items-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            {selectedImage.alt && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center rounded-b-lg">
                <p className="text-sm font-semibold text-brand-gold font-display">
                  {selectedImage.alt}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
      
    </div>
  )
}
