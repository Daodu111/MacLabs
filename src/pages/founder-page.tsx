import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowRight, Award, Users, TrendingUp, Globe, Target, Calendar, Heart, BookOpen, Zap } from 'lucide-react'

interface FounderPageProps {
  onPageChange: (page: string) => void
}

export function FounderPage({ onPageChange }: FounderPageProps) {
  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: "200+",
      label: "Clients Served",
      description: "Successfully helped businesses across the UK grow their digital presence"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      number: "150%",
      label: "Average ROI Increase",
      description: "Consistent results that exceed client expectations"
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      number: "15+",
      label: "Industry Awards",
      description: "Recognition for excellence in digital marketing innovation"
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      number: "8",
      label: "Years Experience",
      description: "Expertise built through diverse industry challenges"
    }
  ]

  const milestones = [
    {
      year: "2016",
      title: "The Beginning",
      description: "Started as a freelance digital marketing consultant in Nottingham, helping local businesses establish their online presence.",
      image: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU3NzQ0NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      year: "2018",
      title: "First Major Success",
      description: "Helped a local retail chain increase online sales by 300% within 6 months, establishing reputation in the Midlands region.",
      image: "https://images.unsplash.com/photo-1696041756040-c910a971f222?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwY2FtcGFpZ258ZW58MXx8fHwxNzU3NzM5NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      year: "2020",
      title: "MacLabs Founded",
      description: "Officially launched MacLabs as a full-service digital marketing agency, expanding team and service offerings.",
      image: "https://images.unsplash.com/photo-1522791786121-a54e01e549c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMGJvYXJkcm9vbXxlbnwxfHx8fDE3NTc3NzI0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Won 'Digital Marketing Agency of the Year' at the Midlands Business Awards, cementing our position as industry leaders.",
      image: "https://images.unsplash.com/photo-1618665276202-0b744599cf56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3RhcnR1cCUyMGF3YXJkfGVufDF8fHx8MTc1Nzc3MjQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ]

  const portfolioProjects = [
    {
      title: "TechStart UK",
      category: "SaaS Startup",
      description: "Complete digital transformation including brand strategy, website development, and lead generation campaigns.",
      results: "400% increase in qualified leads within 3 months",
      image: "https://images.unsplash.com/photo-1537861295351-76bb831ece99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG1hcmtldGluZyUyMHByb2plY3R8ZW58MXx8fHwxNzU3NzcyMzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Brand Strategy", "Lead Generation", "Web Development"]
    },
    {
      title: "GreenEarth Retail",
      category: "E-commerce",
      description: "Sustainable fashion brand's digital marketing overhaul, focusing on social media and influencer partnerships.",
      results: "250% growth in online sales and 500K+ social media reach",
      image: "https://images.unsplash.com/photo-1696041756040-c910a971f222?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwY2FtcGFpZ258ZW58MXx8fHwxNzU3NzM5NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Social Media", "E-commerce", "Influencer Marketing"]
    },
    {
      title: "Nottingham Medical Centre",
      category: "Healthcare",
      description: "Local healthcare provider's digital presence rebuild, improving patient engagement and appointment bookings.",
      results: "180% increase in online appointments and improved patient satisfaction",
      image: "https://images.unsplash.com/photo-1522791786121-a54e01e549c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMGJvYXJkcm9vbXxlbnwxfHx8fDE3NTc3NzI0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Local SEO", "Website Design", "Patient Engagement"]
    }
  ]

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Client-First Approach",
      description: "Every strategy is tailored to your unique needs and goals, not a one-size-fits-all solution."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Continuous Learning",
      description: "Staying ahead of digital trends and algorithm changes to keep your campaigns effective."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Innovation Focus",
      description: "Combining proven strategies with cutting-edge techniques for maximum impact."
    },
    {
      icon: <Target className="h-6 w-6 text-green-500" />,
      title: "Results-Driven",
      description: "Every campaign is measured, optimized, and refined to deliver measurable ROI."
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Meet the Founder:
                <span className="block text-blue-600 mt-2">Alex MacLeod</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From a one-person consultancy in Nottingham to a full-service digital marketing 
                agency serving clients across the UK. This is the story of building MacLabs 
                from passion, persistence, and an unwavering commitment to client success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => onPageChange('contact')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Work With Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
                  onClick={() => {
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  View Portfolio
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGZvdW5kZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTc3NzIzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Alex MacLeod - Founder of MacLabs"
                className="relative w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Track Record</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that speak to years of dedicated work and client success stories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                <div className="text-lg font-semibold text-gray-700 mb-3">{achievement.label}</div>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">The Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry recognition - the milestones that shaped MacLabs.
            </p>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
                <div className="flex-1">
                  <ImageWithFallback
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Featured Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing some of the most successful campaigns and transformative projects 
              that demonstrate our expertise and client-focused approach.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="text-sm font-semibold text-green-800 mb-1">Results:</div>
                    <div className="text-sm text-green-700">{project.results}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => onPageChange('contact')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Discuss Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision, strategy, and client relationship at MacLabs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's collaborate to transform your digital presence and achieve the growth 
            your business deserves. Book a free consultation to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onPageChange('contact')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Book Free Consultation
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              onClick={() => onPageChange('services')}
            >
              View Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}