import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Award, Users, TrendingUp, Heart } from 'lucide-react'

interface AboutPageProps {
  onPageChange: (page: string) => void
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const teamMembers = [
    {
      name: "Sarah Mitchell",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1586996387347-6533bac25f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhcHRvcCUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NTc3NzA5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "10+ years in digital marketing with expertise in scaling startups to $10M+ revenue."
    },
    {
      name: "David Chen",
      position: "Head of Strategy",
      image: "https://images.unsplash.com/photo-1698047682129-c3e217ac08b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwbW9kZXJuJTIwb2ZmaWNlfGVufDF8fHx8MTc1Nzc3MDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Former Google executive specializing in data-driven marketing strategies and growth optimization."
    },
    {
      name: "Emily Rodriguez",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1Nzc3MDkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Award-winning creative with 8+ years creating campaigns that blend artistry with performance."
    }
  ]

  const principles = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Excellence",
      description: "We never settle for 'good enough'. Every campaign, every strategy, every piece of content is crafted to exceed expectations and deliver exceptional results."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Accountability", 
      description: "We take full ownership of your success. When you win, we win. Our transparent reporting and regular check-ins ensure you're always in the loop."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Innovation",
      description: "The digital landscape evolves rapidly, and so do we. We constantly test new strategies, tools, and approaches to keep you ahead of the competition."
    }
  ]

  const stats = [
    { number: "500+", label: "Clients Served" },
    { number: "300%", label: "Average ROI Increase" },
    { number: "5+", label: "Years Experience" },
    { number: "98%", label: "Client Retention" }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              The dream team of{' '}
              <span className="text-blue-600">digital marketing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate marketers, creative thinkers, and growth hackers who believe 
              that great marketing should be both beautiful and measurably effective.
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center"
              >
                <div className="relative mb-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We are an agency that experts more than 5 years
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2019, MacLabs began with a simple mission: to help businesses 
                cut through the digital noise and connect authentically with their audiences. 
                What started as a two-person team has grown into a full-service digital 
                marketing agency trusted by over 500 companies worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our approach combines creative storytelling with data-driven strategies, 
                ensuring every campaign not only looks great but delivers measurable 
                results that drive real business growth.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => onPageChange('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Start Your Journey
              </Button>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMHByb2Zlc3Npb25hbHMlMjBtZWV0aW5nfGVufDF8fHx8MTc1Nzc3MTA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="MacLabs team collaboration"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1736939661350-dec5c2bd5cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHByZXNlbnRlciUyMGxhcHRvcHxlbnwxfHx8fDE3NTc3NzEwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team principles"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The fundamental principles guiding our agency
              </h2>
              
              <div className="space-y-8">
                {principles.map((principle, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                        {principle.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium text-gray-900">Want to see more?</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Click here to see our founder's portfolio and learn more about our journey.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => onPageChange('services')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}