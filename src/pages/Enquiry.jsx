import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react'
import productsData from '@/data/products.json'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { useSEO } from '@/hooks/useSEO'

export const Enquiry = () => {
  useSEO({
    title: 'Get Best Quote | Enquiry - HS Architectural Solutions',
    description: 'Submit your architectural requirement for custom GRC Jali, cladding panels, or columns. Request call back or get a free price quote from our experts.',
    keywords: 'Contact HS Architectural Solutions, GRC Jali price quote, custom GRC design inquiry',
    canonical: 'https://www.hsarchitecturalsolutions.com/enquiry',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact / Send Enquiry - HS Architectural Solutions',
      'description': 'Submit your architectural requirement for custom GRC Jali, cladding panels, or columns.',
      'mainEntity': {
        '@type': 'LocalBusiness',
        'name': 'HS Architectural Solutions',
        'telephone': '+91-8448103775',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Mustli No 137, Khewat No 311/284, Khatauni No 335, Gothda, Gothda Mohbtabad',
          'addressLocality': 'Faridabad',
          'addressRegion': 'Haryana',
          'postalCode': '121004',
          'addressCountry': 'IN'
        }
      }
    }
  })

  const [searchParams] = useSearchParams()

  const categories = [
    { value: 'grc-jali', label: 'GRC Jali' },
    { value: 'grc-panel', label: 'GRC Panel' },
    { value: 'grc-planter', label: 'GRC Planter' },
    { value: 'grc-columns', label: 'GRC Columns' },
    { value: 'grc-cladding', label: 'GRC Cladding' },
    { value: 'grc-cornice', label: 'GRC Cornice' },
    { value: 'fiberglass-planter', label: 'Fiberglass Planter' },
    { value: 'pedestals-basins', label: 'Pedestals Basins' },
    { value: 'epoxy-resin-table', label: 'Epoxy Resin Table' },
    { value: 'decorative-ceiling', label: 'Decorative Ceiling' },
    { value: 'decorative-statue', label: 'Decorative Statue' }
  ]

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    productId: '',
    quantity: '',
    message: '',
    agreement: true
  })

  // Errors & Loading state
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  // Prepopulate form fields from URL params
  useEffect(() => {
    const productParam = searchParams.get('product')
    const categoryParam = searchParams.get('category')

    setFormData(prev => ({
      ...prev,
      category: categoryParam || '',
      productId: productParam || ''
    }))
  }, [searchParams])

  // Get products matching selected category for cascading dropdown
  const filteredProducts = productsData
    .filter(p => p.category === formData.category)
    .map(p => ({ value: p.id, label: p.name }))

  // Reset product selection if category changes
  const handleCategoryChange = (val) => {
    setFormData(prev => ({ ...prev, category: val, productId: '' }))
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: null }))
    }
  }

  const handleProductChange = (val) => {
    setFormData(prev => ({ ...prev, productId: val }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  // Validate form
  const validateForm = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Full name is required'
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = 'Enter a valid 10-digit mobile number'
    }

    // Email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required'
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Enter a valid email address'
    }

    if (!formData.category) tempErrors.category = 'Please select a product category'
    if (!formData.message.trim()) tempErrors.message = 'Please describe your requirements'
    if (formData.message.trim() && formData.message.length < 5) {
      tempErrors.message = 'Requirement details must be at least 5 characters long'
    }
    if (!formData.agreement) tempErrors.agreement = 'You must accept to share your contact details'

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const res = await fetch('https://hs-backend-sooty.vercel.app/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        setIsSuccess(true)
        setSubmittedData({ ...formData })

        setFormData({
          name: '',
          phone: '',
          email: '',
          category: '',
          productId: '',
          quantity: '',
          message: '',
          agreement: true
        })
      } else {
        alert(data.message || 'Failed to submit enquiry. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('A network error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 block font-mono">
          Connect With Us
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-display text-white">
          Send Enquiry & Quote Request
        </h1>
        <div className="w-16 h-[2px] bg-brand-gold mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-2.5 font-display">
              Official Contact Point
            </h3>

            <div className="flex flex-col gap-6 text-sm">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1.5 font-display">Manufacturing Plant</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Mustli No 137, Khewat No 311/284, Khatauni No 335, Gothda, Gothda Mohbtabad, Faridabad - 121004, Haryana, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1.5 font-display">Call / Whatsapp Contacts</h4>
                  <p className="text-xs text-slate-300 font-mono flex flex-col gap-1">
                    <a href="tel:+918448103775" className="hover:text-brand-gold text-sm transition-colors">+91 8448103775 (Main)</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1.5 font-display">Email Queries</h4>
                  <p className="text-xs text-slate-300 font-mono">
                    <a href="mailto:kparvendraer@gmail.com" className="hover:text-brand-gold text-sm transition-colors">kparvendraer@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/5 flex gap-4 items-center">
            <ShieldCheck className="w-8 h-8 text-brand-gold shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Secure Data Sharing</h4>
              <p className="text-[10px] text-slate-400">Your details are only shared directly with the manufacturer to fulfill your price requests.</p>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="lg:col-span-7">
          {isSuccess ? (
            /* Success Response message */
            <div className="glass-panel p-10 rounded-2xl border border-brand-gold/20 flex flex-col items-center text-center gap-6 animate-scale-up">
              <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              <div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">Enquiry Sent Successfully!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{submittedData?.name}</strong>. Your enquiry for GRC/FRP products has been successfully recorded. Parvendra Kumar will respond shortly via mobile or email.
                </p>
              </div>

              <div className="w-full border-t border-white/5 pt-6 text-left text-xs bg-black/10 rounded-lg p-5 flex flex-col gap-3 max-w-md">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px] block border-b border-white/5 pb-1">Enquiry Parameters</span>
                <div>
                  <span className="text-slate-500 font-medium">Full Name:</span> <span className="text-slate-200 font-mono">{submittedData?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Contact Phone:</span> <span className="text-slate-200 font-mono">{submittedData?.phone}</span>
                </div>
                {submittedData?.email && (
                  <div>
                    <span className="text-slate-500 font-medium">Email Address:</span> <span className="text-slate-200 font-mono">{submittedData?.email}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 font-medium">Category:</span> <span className="text-slate-200 uppercase font-mono">{submittedData?.category}</span>
                </div>
                {submittedData?.productId && (
                  <div>
                    <span className="text-slate-500 font-medium">Product ID:</span> <span className="text-slate-200 font-mono">{submittedData?.productId}</span>
                  </div>
                )}
                {submittedData?.quantity && (
                  <div>
                    <span className="text-slate-500 font-medium">Quantity:</span> <span className="text-slate-200">{submittedData?.quantity} units</span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 font-medium">Requirements Details:</span>
                  <p className="text-slate-300 italic bg-brand-charcoal/50 p-2.5 rounded border border-white/5 leading-relaxed">{submittedData?.message}</p>
                </div>
              </div>

              <Button variant="default" size="sm" onClick={() => setIsSuccess(false)} className="mt-2">
                Send Another Enquiry
              </Button>
            </div>
          ) : (
            /* Lead Form */
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col gap-5 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide border-b border-white/10 pb-2.5 font-display">
                Request Price Quote / Product Details
              </h3>

              {/* Grid 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-300">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`glass-input px-4 py-2.5 rounded-lg text-sm text-white ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-slate-300">
                    Mobile Number <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    maxLength="12"
                    className={`glass-input px-4 py-2.5 rounded-lg text-sm text-white ${errors.phone ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Input: Email Address (optional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-slate-300">
                  Email Address <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`glass-input px-4 py-2.5 rounded-lg text-sm text-white ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Dropdown: Category and Cascading Product Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Product Category <span className="text-brand-gold">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onChange={handleCategoryChange}
                    options={categories}
                    placeholder="Select category"
                  />
                  {errors.category && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Specific Product <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <Select
                    value={formData.productId}
                    onChange={handleProductChange}
                    options={filteredProducts}
                    placeholder={formData.category ? 'Select product' : 'Select category first'}
                  />
                </div>
              </div>

              {/* Order Quantity */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quantity" className="text-xs font-semibold text-slate-300">
                  Approximate Order Quantity <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 50 pcs, 200 sq ft"
                  className="glass-input px-4 py-2.5 rounded-lg text-sm text-white"
                />
              </div>

              {/* Message Details */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-slate-300">
                  Enquiry Details & Sizing Requirements <span className="text-brand-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your architectural project, structural loads, custom sizes, design numbers, or other detailed specifications..."
                  className={`glass-input px-4 py-2.5 rounded-lg text-sm text-white resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                />
                {errors.message && (
                  <span className="text-[10px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Checkbox agreement */}
              <div className="flex flex-col gap-1.5 pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="mt-1 h-3.5 w-3.5 rounded border-white/10 bg-black/40 text-brand-gold focus:ring-brand-gold focus:ring-opacity-20"
                  />
                  <span className="text-[10px] text-slate-400 leading-normal">
                    I agree to share my details with HS Architectural Solutions for the purpose of receiving quotation details and catalog pricing sheets.
                  </span>
                </label>
                {errors.agreement && (
                  <span className="text-[10px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.agreement}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="mt-4 flex items-center justify-center gap-2 py-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Recording Lead...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Enquiry
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
