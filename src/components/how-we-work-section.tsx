import { Search, Target, Rocket, BarChart } from 'lucide-react'

export function HowWeWorkSection() {
  const steps = [
    {
      number: "01",
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Discovery & Strategy (Days 1-3)",
      description: "We begin by understanding your project, goals, and current situation. For thought leadership work, we discuss your expertise, target audience, and what you want to be known for. For presale campaigns, we review your project, target investors, competitive landscape, and launch timeline.",
      deliverable: "Strategy document outlining our approach, timeline, and success metrics."
    },
    {
      number: "02", 
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Voice & Positioning (Week 1-2)",
      description: "Before creating any content, we study how you naturally communicate. We review past content, listen to interviews, and understand your perspective and style. This ensures everything we create authentically represents your voice.",
      deliverable: "Voice guide and first batch of content for your review."
    },
    {
      number: "03",
      icon: <Rocket className="h-8 w-8 text-purple-600" />,
      title: "Content Production (Ongoing)",
      description: "We create content according to the agreed schedule. You review and approve (or request revisions). We handle all aspects of production, scheduling, and distribution.",
      deliverable: "For thought leadership: Posts, email courses, and newsletters produced on your monthly schedule. For presale campaigns: Articles, documentation, landing pages, and supporting content produced according to your campaign timeline. Your time commitment: Approximately 30 minutes per week for content reviews and approvals."
    },
    {
      number: "04",
      icon: <BarChart className="h-8 w-8 text-orange-600" />,
      title: "Monitoring & Optimization (Monthly)",
      description: "We track performance metrics relevant to your goals. For thought leadership, that includes follower growth, engagement rates, and profile activity. For presale campaigns, that includes whitelist growth, content engagement, and conversion metrics. Regular strategy calls ensure we're aligned on priorities and making adjustments based on what's working.",
      deliverable: "Monthly performance reports and updated strategy recommendations."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Work Together</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our process ensures we understand your needs and deliver results that matter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-300 text-center">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-blue-900">Deliverable: </span>
                      <span className="text-blue-800">{step.deliverable}</span>
                    </p>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-y-2 border-y-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}