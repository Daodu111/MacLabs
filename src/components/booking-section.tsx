import React, { useEffect } from 'react'

export function BookingSection() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup: remove script on unmount
      const calendlyScript = document.head.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (calendlyScript) {
        document.head.removeChild(calendlyScript)
      }
    }
  }, [])

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Book Your Strategy Call Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Schedule a free 30-minute consultation to discuss your digital marketing goals 
            and discover how we can help accelerate your growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Calendly inline widget embed */}
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/sammydaodubiz/book-strategy-call" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>
      </div>
    </section>
  )
}