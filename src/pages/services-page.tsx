import React from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowRight, Search, PenTool, Target, Settings, MessageCircle, Globe, Zap, BarChart3 } from 'lucide-react'

interface ServicesPageProps {
  onPageChange: (page: string, postId?: string) => void
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  // Helper function to navigate to contact form
  const goToContactForm = () => {
    onPageChange('contact')
    // Set hash after navigation to trigger scroll
    setTimeout(() => {
      window.location.hash = '#contact-form'
    }, 100)
  }

  const services = [
    {
      icon: <PenTool className="h-12 w-12 text-green-600" />,
      title: "Crypto Funnel + Socialmedia Growth Package",
      description: "Our signature offering for crypto founders delivers educational email courses, EECs, and newsletters while building a consistent LinkedIn presence — resulting in more trust, followers, and capital raised.",
      features: [
        "Funnel audit to identify leaks in your investor journey",
        "Educational email course turning cold leads into believers",
        "Professional landing page setup for high conversions",
        "LinkedIn ghostwriting for thought leadership",
        "Newsletter ghostwriting for deeper relationships",
        "Repurposing system: LinkedIn posts into X/Twitter threads",
        "Monthly analytics & iteration reporting",
        "Founder positioning: voice, tone, and narrative development"
      ],
      deliverable: "Complete investor education funnel + consistent social presence that builds authority",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1080&auto=format&fit=crop"
    },
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: "Crypto Marketing for Presale & ICOs",
      description: "Specialized promotional content for presale projects and initial coin offerings. We create compelling campaigns that educate potential investors and drive participation in your funding rounds.",
      features: [
        "Presale promotional content strategy",
        "ICO marketing campaigns and materials",
        "Investor education content and whitepapers",
        "Landing pages optimized for token sales",
        "Email sequences for lead nurturing and conversion",
        "Social media content for community building",
        "Compliance-aware messaging for regulated markets"
      ],
      deliverable: "Complete marketing campaign that drives qualified investor interest and participation",
      image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1080&auto=format&fit=crop"
    }
  ]

  const processSteps = [
    { icon: <MessageCircle className="h-8 w-8" />, title: "Discovery & Audit", description: "Deep dive into your project, target investors, and competitive landscape in the crypto space." },
    { icon: <Globe className="h-8 w-8" />, title: "Strategy & Positioning", description: "Develop your founder narrative, investor messaging, and content strategy tailored for crypto audiences." },
    { icon: <Zap className="h-8 w-8" />, title: "Content & Funnel Creation", description: "Execute with our proven crypto marketing process: funnels, LinkedIn content, and investor education." },
    { icon: <BarChart3 className="h-8 w-8" />, title: "Optimize & Scale", description: "Track performance, refine messaging based on investor feedback, and scale what converts." }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Crypto & Web3{' '}
            <span className="text-blue-600">Marketing That Converts</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Specialized services for crypto founders, DeFi platforms, and Web3 projects. We help you build trust, 
            attract qualified investors, and scale through strategic ghostwriting and targeted crypto marketing.
          </p>
          <Button 
            onClick={goToContactForm}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Get In Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Free Course Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-semibold tracking-wide text-blue-600 uppercase mb-3">
                  Free Course
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Increase Lead Conversion
                  <br />
                  in 5 Days
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  A FREE, 5-day email course breaking down the biggest digital marketing mistakes that
                  cause lower win rates, deals slipping into the next quarter, and a thin pipeline.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <Input type="email" required placeholder="Email Address" className="h-12" />
                  <Button type="submit" className="h-12 bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap px-6">
                    Send Me Lesson #1
                  </Button>
                </form>
              </div>
              <div>
                <div className="bg-gray-100 rounded-2xl p-6 lg:p-10 flex items-center justify-center shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop"
                    alt="Natural Capital Marketing Blueprint book mockup"
                    className="w-full h-auto max-w-md rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="what-we-do" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four core services that form the backbone of any successful content operation. 
              Choose individual services or combine them for maximum impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <div className="text-blue-600 font-medium mb-4">Custom pricing based on your needs</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-blue-600 font-medium mr-2">📋</span>
                      <div>
                        <span className="font-medium text-blue-900">Deliverable: </span>
                        <span className="text-blue-700">{service.deliverable}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline"
                    onClick={goToContactForm}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Get Started
                  </Button>
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-step process ensures your content operation is built for scale, 
              measurable results, and sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gray-300 transform -translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to turn your crypto expertise into authority and capital?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join Web3 founders and crypto projects who've already built trust and attracted investors with MacLabs. 
            Let's discuss your project and create a custom strategy.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={goToContactForm}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}