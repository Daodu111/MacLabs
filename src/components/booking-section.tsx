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
            Ready to Discuss Your Content Strategy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Whether you need ongoing thought leadership support or a focused presale campaign, we can help.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Schedule a 30-minute strategy call to discuss your current situation and goals, which service aligns with your priorities, our approach to working together, and timeline and next steps.
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto italic">
            No sales pressure. Just a clear conversation about whether we're a good fit.
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