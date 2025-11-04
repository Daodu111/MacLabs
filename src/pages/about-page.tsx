import React from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Award, Users, TrendingUp, Heart, Target, BookOpen, Megaphone, BarChart3, ShieldCheck } from 'lucide-react'

interface AboutPageProps {
  onPageChange: (page: string, postId?: string) => void
}

export function AboutPage({ onPageChange }: AboutPageProps) {
  const waysWeHelp = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Strategy & Positioning",
      description: "Clarity on who you serve, why it matters, and how to win attention in crypto-native channels."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      title: "Thought Leadership Content",
      description: "Founder-led narratives, long-form explainers, and educational content that builds authority and trust."
    },
    {
      icon: <Megaphone className="h-6 w-6 text-purple-600" />,
      title: "Social & Distribution",
      description: "Consistent distribution across LinkedIn, X, and communities to reach investors, partners, and users."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
      title: "Investor-Focused Collateral",
      description: "Clear pitch materials, product narratives, and simple visuals that communicate value and traction."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
      title: "Research & Insights",
      description: "Market mapping, competitor scans, and messaging validation to inform smart go-to-market bets."
    },
    {
      icon: <Target className="h-6 w-6 text-orange-600" />,
      title: "Go-To-Market Execution",
      description: "Campaign planning, content calendars, and consistent shipping that compounds reach over time."
    }
  ]
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

  

  return (
    <div className="pt-16">
      {/* 1. About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-blue-600">MacLabs</span>
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                MacLabs helps crypto founders, CEO's, product leaders, and investor-backed teams communicate with clarity, earn trust, and grow faster. We blend crypto-native understanding with practical marketing to turn complex products into simple, compelling stories.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Born from hands-on experience in trading, investing, and working with Web3 teams, we operate where rigor meets creativity—helping you stand out in a crowded, fast-moving market.
              </p>
              <Button 
                onClick={() => onPageChange('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Work With Us
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

      {/* 2. Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We make crypto products understandable and investable. Whether you are shipping infrastructure, DeFi, or consumer apps, our mission is to translate technical depth into clear stories that attract users, partners, and capital.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in accuracy, transparency, and practical execution—pairing strong narratives with distribution that actually moves the needle.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Ways We Help */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ways We Help</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Practical support across messaging, content, and distribution—designed for crypto founders and teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waysWeHelp.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Values We Live By</h2>
            <div className="space-y-6 mx-auto">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg shadow-sm flex items-center justify-center mr-4">
                    <Award className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Collaborative and Supportive</h3>
                    <p className="text-gray-600">We win as a team—combining diverse viewpoints to deliver better outcomes, faster.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-50 rounded-lg shadow-sm flex items-center justify-center mr-4">
                    <TrendingUp className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Driven by Passion</h3>
                    <p className="text-gray-600">Crypto-native curiosity fuels our work—from research to content to distribution.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg shadow-sm flex items-center justify-center mr-4">
                    <Users className="h-7 w-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Committed to Growth</h3>
                    <p className="text-gray-600">We iterate openly, learn fast, and prioritize what creates real compounding value.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-rose-50 rounded-lg shadow-sm flex items-center justify-center mr-4">
                    <Heart className="h-7 w-7 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Open and Constructive</h3>
                    <p className="text-gray-600">We communicate with clarity, give direct feedback, and operate with transparency.</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    <span className="font-medium text-gray-900">Explore insights and case-style writeups</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Visit our blog for frameworks, founder playbooks, and lessons from the field.
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