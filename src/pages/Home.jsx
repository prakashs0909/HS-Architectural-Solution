import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowRight, ShieldCheck, Truck, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useSEO } from '@/hooks/useSEO'

export const Home = () => {
  useSEO({
    title: 'HS Architectural Solutions | GRC Jali, GRC Panels & Planters Manufacturer',
    description: "HS Architectural Solutions is India's premier manufacturer & supplier of GRC Jali screens, concrete cladding panels, architectural Roman columns, and custom fiberglass planters in Faridabad, Haryana.",
    keywords: 'GRC Jali, GRC Panels, GRC Planters, GRC Columns, Cladding Panels, GRC Cornice, Epoxy Tables, GFRC Baluster, HS Architectural Solutions, Faridabad',
    canonical: 'https://www.hsarchitecturalsolutions.com/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'HS Architectural Solutions',
      'image': 'https://www.hsarchitecturalsolutions.com/company-logo.png',
      '@id': 'https://www.hsarchitecturalsolutions.com/#localbusiness',
      'url': 'https://www.hsarchitecturalsolutions.com/',
      'telephone': '+91-8448103775',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Mustli No 137, Khewat No 311/284, Khatauni No 335, Gothda, Gothda Mohbtabad',
        'addressLocality': 'Faridabad',
        'addressRegion': 'Haryana',
        'postalCode': '121004',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 28.3815,
        'longitude': 77.2224
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        'opens': '09:00',
        'closes': '18:00'
      }
    }
  })

  const heroTitleRef = useRef(null)
  const heroSubRef = useRef(null)
  const heroBtnRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(heroTitleRef.current, 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(heroSubRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(heroBtnRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6 },
      '-=0.4'
    )

    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.5 }
      )
    }
  }, [])

  const categories = [
    {
      id: 'grc-jali',
      title: 'GRC Jali & Screens',
      desc: 'Elegant external facade screens providing light filtration, privacy, and classic ornamental patterns.',
      image: '/images/products/white-grc-jali-primary.jpeg'
    },
    {
      id: 'grc-panel',
      title: 'GRC Panels',
      desc: 'Thin, high-strength cladding sheets mimicking stone or architectural raw concrete finishes.',
      image: '/images/products/15mm-grc-panel-primary.jpeg'
    },
    {
      id: 'grc-columns',
      title: 'Columns & Capitals',
      desc: 'Ornate and structural GRC pillars modeled after Doric, Ionic, and Corinthian classical designs.',
      image: '/images/products/white-grc-column-primary.jpeg'
    },
    {
      id: 'grc-planter',
      title: 'GRC Garden Planters',
      desc: 'Contemporary concrete flowerpots and modular landscaping containers for high durability.',
      image: '/images/products/grc-garden-planters-primary.jpeg'
    },
    {
      id: 'grc-cladding',
      title: 'GRC Cladding',
      desc: 'Textured architectural grade GRC wall cladding slabs designed for building elevations.',
      image: '/images/products/wall-cladding-grc-panel-primary.jpeg'
    },
    {
      id: 'grc-cornice',
      title: 'GRC Cornice & Brackets',
      desc: 'Decorative corbels, brackets, and cornices to support roof eaves, windows, and elevations.',
      image: '/images/products/grc-cornice-primary.jpeg'
    },
    {
      id: 'fiberglass-planter',
      title: 'Fiberglass Planters',
      desc: 'Extremely lightweight, glossy, and durable FRP containers for interior and balcony decoration.',
      image: '/images/products/green-fiberglass-planter-round-primary.jpeg'
    },
    {
      id: 'pedestals-basins',
      title: 'Pedestals & Basins',
      desc: 'Premium designer composite resin handwash basins with integrated pedestals.',
      image: '/images/products/grc-bathroom-basin-primary.jpeg'
    },
    {
      id: 'epoxy-resin-table',
      title: 'Epoxy Resin Tables',
      desc: 'Artisanal river dining and center tables blending organic live-edge wood with colorful resins.',
      image: '/images/products/grc-antique-table-tops-primary.jpeg'
    },
    {
      id: 'decorative-ceiling',
      title: 'Decorative Ceilings',
      desc: 'FRP ceiling dome castings and relief vault panels for classical luxury interiors.',
      image: '/images/products/grc-and-frp-ceiling-primary.jpg'
    },
    {
      id: 'decorative-statue',
      title: 'Decorative Statues',
      desc: 'Ornate statues and reliefs cast in high-density weather-proof GRC structural casting.',
      image: '/images/products/grc-sculpture-primary.JPG'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-28 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-brand-dark to-brand-dark/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-brand-clay/5 rounded-full blur-[80px] pointer-events-none" />
        </div>

        <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
          <span className="bg-brand-charcoal border border-white/5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-gold mb-6 block animate-fade-in">
            Architectural Facade & Decorative Stone Craft
          </span>

          <h1 
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] font-display max-w-4xl"
          >
            Sculpting Modern Spaces with <span className="text-gold-gradient">GRC & FRP</span> Crafts
          </h1>

          <p 
            ref={heroSubRef}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-sans"
          >
            HS Architectural Solutions designs and manufactures custom GRC Jali, high-density facade cladding panels, capitals, and premium fiberglass planters in Faridabad.
          </p>

          <div ref={heroBtnRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/our-products">
              <Button variant="default" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 group">
                Browse Products
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/enquiry">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Request Quick Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-brand-charcoal/30 border-y border-white/5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex gap-4 items-start">
            <ShieldCheck className="w-8 h-8 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 font-display">Premium Durability</h4>
              <p className="text-xs text-slate-550">Alkali-resistant glassfibres for superior tensile strength.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Award className="w-8 h-8 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 font-display">Tailored Casting</h4>
              <p className="text-xs text-slate-555">Custom geometric and floral CNC carved mold patterns.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Truck className="w-8 h-8 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 font-display">Safe Logistical Supply</h4>
              <p className="text-xs text-slate-555">Careful packaging and logistics dispatch across North India.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Users className="w-8 h-8 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 font-display">Expert Team Support</h4>
              <p className="text-xs text-slate-555">Dedicated architectural engineers and installation assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 block font-mono">
            Diverse Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Our Architectural Catalog
          </h2>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="glass-card rounded-xl overflow-hidden flex flex-col group border border-white/5">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 font-display">{cat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">{cat.desc}</p>
                <Link to={`/our-products?category=${cat.id}`} className="mt-auto">
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5 text-xs">
                    View Range
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Statistics and Highlights */}
      <section className="py-20 bg-brand-charcoal/20 border-t border-white/5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold font-mono block mb-2">Corporate Stats</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-6 leading-tight">
              Leading Wholesaler & Custom Manufacturer of GRC Components
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Established in 2021 as a sole proprietorship, HS Architectural Solutions operates from an integrated casting and curing facility in Faridabad, Haryana. We partner with architects, site planners, and premium home-builders to create spectacular elevations.
            </p>
            <Link to="/profile">
              <Button variant="default">Learn More About Us</Button>
            </Link>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
              <span className="text-brand-gold font-display text-4xl font-extrabold block mb-1">2021</span>
              <span className="text-xs font-medium uppercase text-slate-400 tracking-wider">Established Year</span>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
              <span className="text-brand-gold font-display text-4xl font-extrabold block mb-1">11-25</span>
              <span className="text-xs font-medium uppercase text-slate-400 tracking-wider">Expert Craftsmen</span>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
              <span className="text-brand-gold font-display text-4xl font-extrabold block mb-1">1.5-5 Cr</span>
              <span className="text-xs font-medium uppercase text-slate-400 tracking-wider">Annual Turnover</span>
            </div>
            <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
              <span className="text-brand-gold font-display text-4xl font-extrabold block mb-1">79%</span>
              <span className="text-xs font-medium uppercase text-slate-400 tracking-wider">Response Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Location Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold font-mono block mb-2">Visit Our Factory</span>
          <h2 className="text-3xl font-bold font-display text-white">Find Us in Faridabad</h2>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Location details */}
          <div className="glass-panel p-8 rounded-xl border border-white/5 flex flex-col justify-between lg:col-span-1">
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 font-display">Factory Address</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Mustli No 137, Khewat No 311/284, Khatauni No 335, Gothda, Gothda Mohbtabad, Faridabad - 121004, Haryana, India
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 font-display">Working Hours</h4>
                <p className="text-xs text-slate-400 font-sans">Monday - Sunday: 09:00 AM - 07:00 PM</p>
                {/* <p className="text-xs text-slate-555 font-sans">Sunday: Closed</p> */}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 font-display">GSTIN Registration</h4>
                <p className="text-xs text-slate-400 font-mono">06GILPK3729P1ZI</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <a 
                href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&hs=WaIq&sca_esv=a75f3b595b8525f4&sxsrf=APpeQnvDrInMv2P41nH8K3N2Dxm5gySm4w%3A1784635906879&kgmid=%2Fg%2F11mrqrvyzg&q=HS%20Architectural%20Solutions&shem=epsd1%2Cltae%2Crimspwouohc&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm1%2F2&kgs=12046b9a7e349aaa"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="default" className="w-full flex items-center justify-center gap-2">
                  Get Driving Directions
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Embedded Google Maps */}
          <div className="lg:col-span-2 relative min-h-[350px] rounded-xl overflow-hidden border border-white/5 bg-brand-charcoal/20">
            <iframe 
              src="https://maps.google.com/maps?q=HS%20Architectural%20Solutions%2C%20Gothda%20Mohbtabad%2C%20Faridabad%2C%20Haryana%20121004&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale invert brightness-90 contrast-125"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
