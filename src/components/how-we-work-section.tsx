import { Search, Target, Rocket, BarChart } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function HowWeWorkSection() {
  const steps = [
    {
      number: "01",
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Discovery",
      description: "We dive deep into your business, audience, and goals to understand what drives your success.",
      details: ["Market research", "Competitor analysis", "Audience personas", "Goal setting"]
    },
    {
      number: "02", 
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Strategy",
      description: "Create a comprehensive roadmap tailored to your specific needs and market opportunities.",
      details: ["Custom strategy", "Channel selection", "Content planning", "Timeline creation"]
    },
    {
      number: "03",
      icon: <Rocket className="h-8 w-8 text-purple-600" />,
      title: "Execute",
      description: "Launch campaigns with precision, ensuring every element aligns with your strategic objectives.",
      details: ["Campaign launch", "Content creation", "Ad management", "Community building"]
    },
    {
      number: "04",
      icon: <BarChart className="h-8 w-8 text-orange-600" />,
      title: "Optimize",
      description: "Continuously monitor, analyze, and refine campaigns for maximum performance and ROI.",
      details: ["Performance tracking", "A/B testing", "Data analysis", "Strategy refinement"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our proven 4-step methodology ensures your digital marketing campaigns 
            deliver exceptional results from day one.
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
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
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

        <div className="mt-16">
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
      </div>
    </section>
  )
}