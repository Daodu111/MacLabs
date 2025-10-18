import React from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Award, Users, TrendingUp, Heart } from 'lucide-react'

interface AboutPageProps {
  onPageChange: (page: string, postId?: string) => void
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const teamMembers = [
    {
      name: "Sam Daodu",
      position: "Founder & Crypto Marketing Strategist",
      image: "https://images.unsplash.com/photo-1586996387347-6533bac25f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhcHRvcCUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NTc3NzA5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Crypto native with deep experience in Web3 marketing, trading, and investment. Specialized in helping crypto founders build authority and attract capital."
    },
    {
      name: "Alex Chen",
      position: "Head of Crypto Content Strategy",
      image: "https://images.unsplash.com/photo-1698047682129-c3e217ac08b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwbW9kZXJuJTIwb2ZmaWNlfGVufDF8fHx8MTc1Nzc3MDkxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Former DeFi protocol marketing lead specializing in investor education and compliance-aware messaging for crypto projects."
    },
    {
      name: "Maya Rodriguez",
      position: "Senior Ghostwriter & LinkedIn Strategist",
      image: "https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1Nzc3MDkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Expert in founder positioning and thought leadership content. Helps crypto executives build authority through strategic LinkedIn presence."
    }
  ]

  const principles = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Crypto Native Understanding",
      description: "We don't just write about crypto—we live it. Our team trades, invests, and understands both the technical and business sides of Web3 projects."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Direct Client Relationships", 
      description: "We work directly with crypto projects, not as outsourced writers for agencies. This means better alignment, deeper understanding, and more substantial results."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "Proven Track Record",
      description: "From freelancer to agency, we've walked the path of building credibility and scaling in the crypto space. We understand your journey and challenges."
    }
  ]

  const stats = [
    { number: "50+", label: "Crypto Projects Served" },
    { number: "500%", label: "Average Engagement Increase" },
    { number: "3+", label: "Years in Crypto" },
    { number: "95%", label: "Client Success Rate" }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Meet the crypto native team behind{' '}
              <span className="text-blue-600">MacLabs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're not just marketers—we're crypto enthusiasts, traders, and builders who understand 
              the unique challenges of the Web3 space and what it takes to succeed.
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
                From crypto trader to trusted marketing partner
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                MacLabs was founded by Sam Daodu, a crypto native who understands both sides of the equation. 
                As someone who trades, invests, and has worked with numerous crypto projects, Sam recognized 
                the gap between generic marketing agencies and what crypto founders actually need.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our approach combines deep crypto market knowledge with proven marketing strategies. 
                We specialize in Web3 gaming, GambleFi, DeFi platforms, and crypto infrastructure tools—
                helping founders build authority, attract qualified investors, and scale their projects.
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
                What makes us different in the crypto space
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
                  Check out our blog for insights, strategies, and success stories from our journey.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => onPageChange('blog')}
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Read Our Blog
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}