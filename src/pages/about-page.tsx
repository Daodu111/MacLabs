import React from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Award, Users, TrendingUp, Heart } from 'lucide-react'

interface AboutPageProps {
  onPageChange: (page: string, postId?: string) => void
}

export function AboutPage({ onPageChange }: AboutPageProps) {

  

  return (
    <div className="pt-16">
      {/* 1. About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-blue-600">MacLabs</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                MacLabs was founded to solve a specific problem: crypto founders have expertise worth sharing, but lack the time to create consistent, high-quality content.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Since 2019, we've specialized in two areas: helping founders build long-term thought leadership through LinkedIn ghostwriting, and helping projects execute successful token launches through comprehensive presale marketing campaigns.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We're crypto-native. We understand the technology, the market dynamics, and the unique communication challenges that come with building in this space. We've created content through multiple market cycles and worked with projects across DeFi, GameFi, infrastructure, and emerging niches.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our approach is straightforward: understand what you're trying to achieve, create content that serves those goals, measure what matters, and continuously improve based on results.
              </p>
              <Button 
                onClick={() => onPageChange('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Book A Call
              </Button>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMHByb2Zlc3Npb25hbHMlMjBtZWV0aW5nfGVufDF8fHx8MTc1Nzc3MTA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="MacLabs team collaboration"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Experience - Original timeline design commented out */}
      {/* 
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Experience</h2>
            <div className="relative">
              <div className="relative space-y-8 md:space-y-12 py-2">
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 inset-y-2 w-0.5 bg-blue-600 z-0"></div>
                {[
                  {
                    heading: "Creating crypto content since 2019",
                    description: "Six years of experience navigating the evolving crypto landscape, from DeFi summer to the current market cycle."
                  },
                  {
                    heading: "Written 1,000+ presale articles across multiple market cycles",
                    description: "Extensive portfolio of content helping projects communicate their value proposition to investors and communities."
                  },
                  {
                    heading: "Ghostwritten for founders featured in CoinTelegraph, Yahoo Finance, The Block",
                    description: "Building credible thought leadership for crypto founders in top-tier publications that matter to the industry."
                  },
                  {
                    heading: "Worked with projects in DeFi, GameFi, infrastructure, and specialized niches",
                    description: "Deep expertise across multiple sectors, from complex DeFi protocols to emerging gaming ecosystems."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20 -mt-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    <div className="w-full max-w-2xl mx-auto md:px-12 relative z-10">
                      <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {item.heading}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-12 text-center">
              If you're building something in crypto and need help with content, we'd like to talk.
            </p>
          </div>
        </div>
      </section>
      */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-5">Our Experience</h2>
            </div>

            {/* Timeline */}
            <div className="max-w-3xl mx-auto relative px-5">
              {/* Timeline Line */}
              <div 
                className="absolute hidden md:block"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '2px',
                  height: '100%',
                  backgroundColor: '#e5e7eb',
                  zIndex: 1
                }}
              ></div>

              {/* Timeline Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {/* Item 1 - Left */}
                <div className="relative flex items-center">
                  <div 
                    className="absolute hidden md:block"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                      border: '4px solid white',
                      zIndex: 10
                    }}
                  ></div>
                  <div 
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all w-full md:w-5/12"
                    style={{
                      marginRight: 'auto',
                      marginLeft: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating crypto content since 2019</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Six years of experience navigating the evolving crypto landscape, from DeFi summer to the current market cycle.</p>
                  </div>
                </div>

                {/* Item 2 - Right */}
                <div className="relative flex items-center">
                  <div 
                    className="absolute hidden md:block"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                      border: '4px solid white',
                      zIndex: 10
                    }}
                  ></div>
                  <div 
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all w-full md:w-5/12"
                    style={{
                      marginLeft: 'auto',
                      marginRight: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Written 1,000+ presale articles across multiple market cycles</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Extensive portfolio of content helping projects communicate their value proposition to investors and communities.</p>
                  </div>
                </div>

                {/* Item 3 - Left */}
                <div className="relative flex items-center">
                  <div 
                    className="absolute hidden md:block"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                      border: '4px solid white',
                      zIndex: 10
                    }}
                  ></div>
                  <div 
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all w-full md:w-5/12"
                    style={{
                      marginRight: 'auto',
                      marginLeft: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ghostwritten for founders featured in CoinTelegraph, Yahoo Finance, The Block</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Building credible thought leadership for crypto founders in top-tier publications that matter to the industry.</p>
                  </div>
                </div>

                {/* Item 4 - Right */}
                <div className="relative flex items-center">
                  <div 
                    className="absolute hidden md:block"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                      border: '4px solid white',
                      zIndex: 10
                    }}
                  ></div>
                  <div 
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all w-full md:w-5/12"
                    style={{
                      marginLeft: 'auto',
                      marginRight: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Worked with projects in DeFi, GameFi, infrastructure, and specialized niches</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Deep expertise across multiple sectors, from complex DeFi protocols to emerging gaming economies and Layer 1/2 infrastructure.</p>
                  </div>
                </div>

                {/* Item 5 - Left */}
                <div className="relative flex items-center">
                  <div 
                    className="absolute hidden md:block"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#2563eb',
                      borderRadius: '50%',
                      border: '4px solid white',
                      zIndex: 10
                    }}
                  ></div>
                  <div 
                    className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all w-full md:w-5/12"
                    style={{
                      marginRight: 'auto',
                      marginLeft: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Managed campaigns for projects ranging from early-stage launches to established protocols</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Comprehensive marketing strategy and execution from token generation events to mature protocol growth initiatives.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="text-center mt-16 p-10 bg-gray-50 rounded-lg max-w-3xl mx-auto">
              <p className="text-gray-600 text-lg">If you're building something in crypto and need help with content, we'd like to talk.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}