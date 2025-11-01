import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import './contact-accordion.css'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog'
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Plus, Minus, CheckCircle } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion'
import { GoogleSheetsService } from '../services/integrations'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Try to save to Firestore 'contacts' collection (non-blocking)
      try {
        await addDoc(collection(db, 'contacts'), {
          ...formData,
          status: 'new',
          createdAt: serverTimestamp(),
        })
      } catch (firestoreError) {
        console.warn('Firestore save failed (non-blocking):', firestoreError)
      }

      // Also notify via Google Apps Script Web App (non-blocking)
      try {
        await GoogleSheetsService.sendToGoogleSheets(formData, 'contact')
      } catch (gsError) {
        console.warn('Google Apps Script notification skipped/failed (non-blocking):', gsError)
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
      
      // Show success message
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Contact form error:', error)
      setShowErrorModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email Us",
      content: "sam.daodu@maclabsmarketing.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Call Us",
      content: "+447831692196",
      description: "Mon - Fri, 9AM to 5PM GMT"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Business Hours",
      content: "Mon - Fri 9AM to 5PM",
      description: "GMT (Greenwich Mean Time)"
    }
  ]

  const faqs = [
    {
      question: "How long does it take to see results?",
      answer: "Most clients start seeing initial results within 30-60 days, with significant improvements typically visible after 3 months of consistent implementation."
    },
    {
      question: "What's included in your monthly retainer?",
      answer: "Our retainers include strategy development, campaign execution, content creation, performance monitoring, and monthly reporting calls."
    },
    {
      question: "Do you work with small businesses?",
      answer: "Absolutely! We work with businesses of all sizes, from startups to enterprise companies. We tailor our services to fit your budget and goals."
    },
    {
      question: "Can we start with a small project?",
      answer: "Yes, we offer project-based work and can start with a smaller engagement to demonstrate our capabilities before moving to a retainer relationship."
    }
  ]

  return (
    <div className="pt-16">
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Message Sent Successfully!
            </DialogTitle>
            <DialogDescription className="text-gray-600 pt-2">
              Thank you! Your message has been sent successfully. We will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <MessageSquare className="h-10 w-10 text-red-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Oops! Something Went Wrong
            </DialogTitle>
            <DialogDescription className="text-gray-600 pt-2">
              There was an error submitting your message. Please try again or contact us directly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={() => setShowErrorModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Let's Scale Your{' '}
            <span className="text-blue-600">Crypto Project</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Ready to build authority and attract investors? Get in touch with our crypto-native team 
            and let's discuss how we can help you achieve your Web3 goals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Free Consultation
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Custom Crypto Strategy
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Web3 Native Expertise
            </span>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 (0)115 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interest
                      </label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="content-strategy">Content Strategy</SelectItem>
                          <SelectItem value="social-media">Social Media Marketing</SelectItem>
                          <SelectItem value="email-marketing">Email Marketing</SelectItem>
                          <SelectItem value="seo-sem">SEO & SEM</SelectItem>
                          <SelectItem value="brand-design">Brand Design</SelectItem>
                          <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                          <SelectItem value="full-service">Full Service Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us about your project
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your goals, challenges, and what you're hoping to achieve..."
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <p className="text-gray-900 mb-1">{info.content}</p>
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Prefer to talk?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Schedule a free 30-minute consultation call to discuss your needs.
                </p>
                <Button 
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative" style={{ background: 'linear-gradient(to bottom, #3b82f6, #2563eb, #1d4ed8)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 pt-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl" style={{ color: '#ffffff' }}>
              Get quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 py-10 md:py-14">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <AccordionTrigger className="px-0 pt-6 pb-6 first:pt-0 hover:no-underline [&>svg:last-child]:!hidden group items-center">
                    <span className="text-left font-semibold text-gray-900 pr-6 flex-1 text-lg">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 transition-colors pointer-events-none ml-4 my-2" style={{ borderRadius: '50%', aspectRatio: '1 / 1' }}>
                      <Plus className="h-5 w-5 text-white transition-all accordion-icon-plus" />
                      <Minus className="h-5 w-5 text-white transition-all accordion-icon-minus hidden" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-6">
                    <div className="pt-2">
                      <p className="text-gray-600 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </div>
        </div>
      </section>
    </div>
  )
}