import { Target, Cog, Shield, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'

export function WhyChooseSection() {
  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Deep Crypto Expertise",
      description: "We've been creating content for crypto projects since 2019. We understand DeFi protocols, tokenomics, governance structures, and technical architecture at a fundamental level. When you discuss liquidity pools or Layer 2 scaling solutions, we don't need explanations. This expertise allows us to create content that speaks credibly to technical audiences while remaining accessible to investors who may be newer to crypto."
    },
    {
      icon: <Target className="h-12 w-12 text-green-600" />,
      title: "Specialized in Complex Niches", 
      description: "Many marketing agencies avoid technically complex or controversial crypto niches. We specialize in them. GambleFi, high-leverage DeFi, emerging blockchain infrastructure—if your project requires deep technical understanding and careful positioning, we have experience in these areas."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-purple-600" />,
      title: "Experience Across Market Cycles",
      description: "We've created content through bull markets, bear markets, and everything in between. This experience informs our approach to messaging. The strategies that work during periods of high retail enthusiasm differ from what resonates during more cautious market conditions. We adjust our approach based on current market sentiment and investor behavior rather than applying one-size-fits-all templates."
    },
    {
      icon: <Cog className="h-12 w-12 text-orange-600" />,
      title: "Focus on Outcomes",
      description: "We don't measure success by word count or number of posts published. We measure it by the outcomes you care about: follower growth, engagement rates, whitelist signups, community sentiment, and whether your content is helping you achieve your business objectives. Every strategy call, every piece of content, and every campaign decision is made with your specific goals in mind."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Crypto Founders Choose MacLabs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors duration-300">
                  {benefit.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to turn your crypto expertise into authority and capital?
            </h3>
            <p className="text-gray-600 mb-6">
              Join Web3 founders and crypto projects who've already built trust and attracted investors with MacLabs
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                No Setup Fees
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Custom Pricing
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Crypto Native Team
              </span>
            </div>
            <div className="mt-8">
              <a href="#booking">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                  Book A Strategy Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}