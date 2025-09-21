import { Target, Cog, Shield, TrendingUp } from 'lucide-react'

export function WhyChooseSection() {
  const benefits = [
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: "End-to-End Content Mastery",
      description: "From SEO blogs to ghostwriting to funnels, we handle strategy + execution across the entire content lifecycle."
    },
    {
      icon: <Cog className="h-12 w-12 text-green-600" />,
      title: "Systems & Scale", 
      description: "No more chaos. We build automation so your content operation runs smooth and scales without breaking."
    },
    {
      icon: <Shield className="h-12 w-12 text-purple-600" />,
      title: "High-Trust Niche Specialization",
      description: "Crypto, SaaS, iGaming, and finance — we know the sensitive industries and compliance requirements."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-orange-600" />,
      title: "Proven Freelancer-to-Agency Edge",
      description: "We've walked the path of writing, scaling, and building credibility from scratch. We understand your journey."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Clients Choose MacLabs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're not just another marketing agency. We're content specialists who understand 
            what it takes to build authority, drive traffic, and convert leads at scale.
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
              Ready to build a content system that ranks, converts, and scales?
            </h3>
            <p className="text-gray-600 mb-6">
              Join crypto, SaaS, and tech brands who've already transformed their content strategy with MacLabs
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                No Setup Fees
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                30-Day Money Back
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Dedicated Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}