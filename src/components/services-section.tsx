import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowRight, Search, PenTool, Target, Settings } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "SEO Content & Strategy",
      description: "We don't just write blogs. We build topic clusters, internal linking maps, and long-tail SEO strategies that turn your blog into a traffic engine.",
      image: "https://images.unsplash.com/photo-1630331528526-7d04c6eb463f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NzcwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Keyword research & clustering", "Content calendar & editorial strategy", "SEO-optimized blogs & landing pages"]
    },
    {
      icon: <PenTool className="h-8 w-8 text-green-600" />,
      title: "Ghostwriting for Founders",
      description: "High-ticket service. We turn your expertise into influence. From crypto CEOs to SaaS founders, we help you build authority with scroll-stopping social posts.",
      image: "https://images.unsplash.com/photo-1656164631668-8673eab87b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc1NzY3MDU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["LinkedIn + Twitter growth posts", "Voice development & narrative positioning", "Repurposing frameworks"]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Copywriting & Funnels",
      description: "Great content brings traffic. Copy turns it into sales. We create landing pages, email sequences, and ad copy that captures, nurtures, and converts leads.",
      image: "https://images.unsplash.com/photo-1586996387347-6533bac25f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhcHRvcCUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NTc3NzA5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Landing pages that convert", "Email sequences", "Ad copy for LinkedIn, Twitter, Meta"]
    },
    {
      icon: <Settings className="h-8 w-8 text-orange-600" />,
      title: "Content Ops & Automation",
      description: "Your competitive edge → scale without chaos. We set up systems so content gets produced, published, and tracked seamlessly.",
      image: "https://images.unsplash.com/photo-1630331528526-7d04c6eb463f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NzcwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Notion content hubs", "Automated workflows", "CRM + email automation"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Forget the generic "social marketing" and "email campaigns." We build end-to-end content systems 
            that turn your expertise into authority, traffic into leads, and leads into revenue.
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