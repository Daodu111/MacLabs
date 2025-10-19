import { Target, Cog, Shield, TrendingUp } from 'lucide-react'

export function WhyChooseSection() {
  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Crypto & Web3 Native Understanding",
      description: "We don't just write about crypto—we live it. Our team trades, invests, and understands both sides of the equation, helping you communicate authentically to investors."
    },
    {
      icon: <Target className="h-12 w-12 text-green-600" />,
      title: "Specialized Niche Focus", 
      description: "Web3 gaming, GambleFi, DeFi platforms, and crypto infrastructure tools. We know the sensitive industries, compliance requirements, and what resonates with your audience."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-purple-600" />,
      title: "Thought Leadership Positioning",
      description: "We transform crypto founders into recognized thought leaders by building their authority on X (Twitter) and LinkedIn. Our strategic content positions you as an expert who investors trust and follow."
    },
    {
      icon: <Cog className="h-12 w-12 text-orange-600" />,
      title: "Systems That Scale Without Chaos",
      description: "From funnel audits to automated workflows, we build systems so your content operation runs smoothly and scales as you grow your project."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Crypto Founders Choose MacLabs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're not just another marketing agency. We're crypto natives who understand the unique 
            challenges of building trust, attracting investors, and scaling in the Web3 space.
          </p>
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
          </div>
        </div>
      </div>
    </section>
  )
}