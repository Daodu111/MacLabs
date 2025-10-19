import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowRight, Search, PenTool, Target, Settings } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: <PenTool className="h-8 w-8 text-green-600" />,
      title: "Ghostwriting for Crypto Founders",
      description: "Turn your crypto expertise into influence. We help Web3 founders, executives, and influencers build authority through strategic LinkedIn content and educational email courses that attract investors and build trust.",
      image: "https://images.unsplash.com/photo-1656164631668-8673eab87b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc1NzY3MDU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["LinkedIn thought leadership posts", "Educational email courses", "Newsletter ghostwriting", "Voice development & positioning", "X/Twitter thread repurposing"]
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Crypto Marketing & Funnels",
      description: "Specialized marketing for pre-sale projects and ICOs. We create compelling promotional content, landing pages, and investor education funnels that convert cold leads into warm believers ready to invest.",
      image: "https://images.unsplash.com/photo-1586996387347-6533bac25f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhcHRvcCUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NTc3NzA5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Pre-sale & ICO promotional content", "High-converting landing pages", "Investor education funnels", "Email sequences for lead nurturing", "Analytics & funnel optimization"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We specialize in two high-impact services for crypto and Web3 brands: strategic ghostwriting 
            for founders raising capital, and crypto marketing for pre-sale and ICO projects.
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
                >
                  Learn More
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