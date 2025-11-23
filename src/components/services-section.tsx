import React from 'react'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowRight, Search, PenTool, Target, Settings } from 'lucide-react'

interface ServicesSectionProps {
  onPageChange?: (page: string, postId?: string) => void
}

export function ServicesSection({ onPageChange }: ServicesSectionProps) {
  const services = [
    {
      icon: <PenTool className="h-8 w-8 text-green-600" />,
      title: "Thought Leadership & Personal Branding",
      description: "Ghostwriting Services for Crypto Founders & Executives. We create 10-20 LinkedIn posts per month that position you as a recognized voice in your niche. Includes educational email courses, newsletter ghostwriting, voice calibration, and profile optimization.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1080&q=80",
      features: ["LinkedIn ghostwriting (10-20 posts/month)", "Educational email courses (EECs)", "Newsletter ghostwriting", "Voice calibration & positioning", "Profile optimization"]
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Presale Marketing Agency",
      description: "Full-Service Content Campaigns for Token Launches. We produce 50-100+ articles, create whitepaper & tokenomics documentation, build landing pages & conversion funnels, and distribute content across crypto media for your presale or ICO.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1080&q=80",
      features: ["Strategic campaign planning", "High-volume article production (50-100+)", "Whitepaper & tokenomics documentation", "Landing pages & conversion funnels", "Distribution across crypto media"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We specialize in two distinct areas of crypto content creation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gray-50 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  className="group border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => {
                    if (onPageChange) {
                      onPageChange('services')
                      // Scroll to "What We Do" section after navigation
                      setTimeout(() => {
                        const element = document.getElementById('what-we-do')
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }, 300)
                    }
                  }}
                >
                  {index === 0 ? 'Discuss Personal Branding Strategy' : 'Discuss Presale Campaign'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}