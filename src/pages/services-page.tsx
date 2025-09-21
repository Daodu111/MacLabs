import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowRight, Search, PenTool, Target, Settings, MessageCircle, Globe, Zap, BarChart3 } from 'lucide-react'

interface ServicesPageProps {
  onPageChange: (page: string) => void
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  const services = [
    {
      icon: <Search className="h-12 w-12 text-blue-600" />,
      title: "SEO Content & Strategy",
      description: "We don't just write blogs. We build topic clusters, internal linking maps, and long-tail SEO strategies that turn your blog into a traffic engine.",
      features: [
        "Keyword research & clustering (using Surfer/NeuronWriter)",
        "Content calendar & editorial strategy",
        "SEO-optimized blogs & landing pages",
        "Internal linking strategy + on-page SEO"
      ],
      deliverable: "Full content plan + execution at scale",
      image: "https://images.unsplash.com/photo-1630331528526-7d04c6eb463f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NzcwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      pricing: "Starting at £3,500/month"
    },
    {
      icon: <PenTool className="h-12 w-12 text-green-600" />,
      title: "Ghostwriting for Founders",
      description: "High-ticket service. We turn your expertise into influence. From crypto CEOs to SaaS founders, we help you build authority with scroll-stopping social posts.",
      features: [
        "LinkedIn + Twitter growth posts (threads, thought leadership)",
        "Voice development & narrative positioning",
        "Repurposing frameworks (turning 1 idea into 10 pieces)",
        "Portfolio-quality ghostwritten samples"
      ],
      deliverable: "Consistent content that grows followers, trust, and inbound leads",
      image: "https://images.unsplash.com/photo-1656164631668-8673eab87b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc1NzY3MDU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      pricing: "Starting at £5,000/month"
    },
    {
      icon: <Target className="h-12 w-12 text-purple-600" />,
      title: "Copywriting & Funnels",
      description: "Great content brings traffic. Copy turns it into sales. We create conversion-focused copy that captures, nurtures, and converts leads.",
      features: [
        "Landing pages that convert",
        "Email sequences (welcome, nurture, upsell)",
        "Ad copy (LinkedIn, Twitter, Meta)",
        "Conversion-focused web copy"
      ],
      deliverable: "A funnel-ready package that captures, nurtures, and converts leads",
      image: "https://images.unsplash.com/photo-1586996387347-6533bac25f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhcHRvcCUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NTc3NzA5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      pricing: "Starting at £2,800/month"
    },
    {
      icon: <Settings className="h-12 w-12 text-orange-600" />,
      title: "Content Ops & Automation",
      description: "Your competitive edge → scale without chaos. We set up systems so content gets produced, published, and tracked seamlessly.",
      features: [
        "Notion content hubs (for clients & teams)",
        "Automated workflows (brief → draft → editor → publish)",
        "CRM + email automation (HubSpot/Zapier/Make)",
        "Analytics dashboards (GA4 + custom reporting)"
      ],
      deliverable: "A repeatable, scalable content machine",
      image: "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1Nzc3MDkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      pricing: "Starting at £2,200/month"
    }
  ]

  const processSteps = [
    { icon: <MessageCircle className="h-8 w-8" />, title: "Discovery & Audit", description: "Deep dive into your current content, audience, and competitive landscape." },
    { icon: <Globe className="h-8 w-8" />, title: "Strategy & Systems", description: "Build content strategy, topic clusters, and automation workflows." },
    { icon: <Zap className="h-8 w-8" />, title: "Content Production", description: "Execute at scale with our proven editorial and content creation process." },
    { icon: <BarChart3 className="h-8 w-8" />, title: "Measure & Scale", description: "Track performance, optimize based on data, and scale what works." }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Content Systems That{' '}
            <span className="text-blue-600">Rank, Convert & Scale</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Forget generic "digital marketing." We build end-to-end content operations for crypto, SaaS, and tech brands 
            that turn expertise into authority and traffic into revenue.
          </p>
          <Button 
            onClick={() => onPageChange('contact')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Book a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
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
                    <div className="text-blue-600 font-medium mb-4">{service.pricing}</div>
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
                    onClick={() => onPageChange('contact')}
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
            Ready to build a content system that ranks, converts, and scales?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join crypto, SaaS, and tech brands who've already transformed their content strategy. 
            Let's discuss your goals and build a custom plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onPageChange('contact')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Book a Free Consultation
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              onClick={() => onPageChange('about')}
            >
              See Our Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}