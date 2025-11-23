import React from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowRight, Search, PenTool, Target, Settings } from 'lucide-react'

interface ServicesPageProps {
  onPageChange: (page: string, postId?: string) => void
}

export function ServicesPage({ onPageChange }: ServicesPageProps) {
  // Helper function to navigate to contact form
  const goToContactForm = () => {
    onPageChange('contact')
    // Set hash after navigation to trigger scroll
    setTimeout(() => {
      window.location.hash = '#contact-form'
    }, 100)
  }

  const services = [
    {
      icon: <PenTool className="h-12 w-12 text-green-600" />,
      title: "Thought Leadership & Personal Branding",
      subtitle: "Position Your Founder as the Voice of Authority in Your Niche",
      whoFor: "This service is designed for crypto founders who want to establish authority in their niche, secure top-tier media placements, and strengthen their project or company's reputation. Whether you're a DeFi protocol, infrastructure project, or emerging platform, we help you build credibility that resonates across the industry. This service is for founders who want to step away from the technical details and dedicate time to building authority.",
      whatsIncluded: [
        {
          title: "3-6 Ghostwritten Thought Leadership Articles Per Month",
          description: "We create 1-3 expert-level articles that establish you as a thought leader in your space. Content focuses on your expertise, insights, and the value you bring to the ecosystem."
        },
        {
          title: "Media Pitching & Relationship Building",
          description: "We identify top-tier crypto publications that align with your positioning and pitch articles on your behalf to build relationships with key editors."
        },
        {
          title: "Content Strategy & Messaging Consultation",
          description: "We help you develop a robust personal brand strategy, map your areas of expertise, and create a long-term strategic plan for audience-appropriate positioning."
        },
        {
          title: "Interview Support & Talking Points",
          description: "We supply your official story, prepare interview questions, and create notable content to help make when you step into spotlight. You always set up with the right narrative and sound bites."
        }
      ],
      linkedInTwitter: "Beyond long-form articles, we'll help you establish a presence on the platforms that matter to VCs, partners and potential users. We develop insightful posts, organize your industry takes and respond to trending crypto topics. Your LinkedIn becomes a hub where investors, partners, and community members come. We help you expand your voice strategically on Twitter, building out the context you need with targeted commentary.",
      strategicPositioning: "Whether you need help crafting an origin story with goals and vision that stand out from competitors, full brand positioning, our periodic strategy sessions help identify where to position your founder brand within its wider audience. We help find and refine your messaging through industry feedback and data.",
      idealClients: [
        "Crypto founders building in DeFi, infrastructure, or Web3",
        "Projects raising capital and need founder visibility",
        "Founders wanting to establish authority in a specific crypto niche",
        "Established projects looking for consistent thought leadership in top-tier publications",
        "Teams where the founder has expertise but lacks time to write consistently"
      ],
      buttonText: "Request a Quote"
    },
    {
      icon: <Target className="h-12 w-12 text-blue-600" />,
      title: "Presale Marketing Agency",
      subtitle: "End-to-End Marketing Campaigns for Token Launches",
      whoFor: "Crypto teams at launch or token generation phase who are launching a token or a presale in the next 30-90 days. You need the right playbook from community building and distribution to conversion. We provide support at go-to-market strategy, crypto media placement, and community driving buzz in order to ensure launch success.",
      whatsIncluded: [
        {
          title: "Strategic Campaign Planning",
          description: "We develop a custom campaign roadmap to fit your target audience, distribution channels, and positioning. A tailored framework that turns buzz into conversions."
        },
        {
          title: "Comprehensive Content Strategy",
          description: "We produce all forms of content necessary to create buzz, present value and get people investing. From pitch decks to explainer articles to video scripts."
        },
        {
          title: "Media Distribution & PR",
          description: "Our targeted press articles are featured in Crypto media outlets like CoinTelegraph and Benzinga. We coordinate exclusive news and promote key press attention for each milestone."
        },
        {
          title: "Community Building & Engagement",
          description: "We assist your project's growth organically with strategic engagement support in Discord, Telegram and Twitter. We assist your moderators grow hype and nurture an invested community for your launch."
        },
        {
          title: "Performance Analytics & Reporting",
          description: "We track campaign performance on each medium and through regular KPIs to inform data-driven tweaks. Our overview dashboard shows live return on investment and campaign impact for transparency."
        },
        {
          title: "Influencer & KOL Coordination",
          description: "We arrange and coordinate your KOL's campaign and generate strategic reach throughout your audience. We review which influencers are effective and support your project with outreach."
        }
      ],
      outcome: "By the end of your campaign, you should be well positioned to successfully launch your project's token sale and positioned for presale and for productmarket fit. You will have assembled a platform for future campaigns, credibility for sustainability through respected mainstream media press, and a community geared to support your long term project.",
      idealClients: [
        "Projects preparing for a presale or TGE in 30-90 days",
        "New crypto projects launching and needing end-to-end marketing support",
        "Teams with a working product looking to drive significant launch interest",
        "Established projects launching new tokens, features, or major updates",
        "Founders without in-house marketing capabilities for comprehensive campaigns"
      ],
      buttonText: "Request a Quote"
    }
  ]


  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We specialize in two distinct areas of crypto content creation.
          </p>
        </div>
      </section>

      {/* Free Course Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* Services Grid */}
      <section id="what-we-do" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {services.map((service, index) => (
              <React.Fragment key={index}>
                <div className={`bg-white pb-20 ${index === 1 ? 'pt-16' : ''}`}>
                  <div className="flex items-center mb-8">
                    <div className="flex-shrink-0 mr-4">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-blue-600 font-semibold text-lg mb-8">{service.subtitle}</p>

                  <div className="space-y-8">
                    {/* Who This Is For */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Who This is For</h3>
                      <p className="text-gray-600 leading-relaxed">{service.whoFor}</p>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-6">What's Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ columnGap: '1.25rem', rowGap: '1.5rem' }}>
                        {service.whatsIncluded.map((item, itemIndex) => (
                          <div key={itemIndex} className="bg-gray-50 rounded-lg p-8 border-l-4 border-blue-600 min-h-[280px]">
                            <h4 className="font-semibold text-gray-900 mb-3 text-base">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* LinkedIn & Twitter Thought Leadership (only for first service) */}
                    {service.linkedInTwitter && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">LinkedIn & Twitter Thought Leadership</h3>
                        <p className="text-gray-600 leading-relaxed">{service.linkedInTwitter}</p>
                      </div>
                    )}

                    {/* Strategic Positioning & Messaging (only for first service) */}
                    {service.strategicPositioning && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Strategic Positioning & Messaging</h3>
                        <p className="text-gray-600 leading-relaxed">{service.strategicPositioning}</p>
                      </div>
                    )}

                    {/* The Outcome (only for second service) */}
                    {service.outcome && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">The Outcome</h3>
                        <p className="text-gray-600 leading-relaxed">{service.outcome}</p>
                      </div>
                    )}

                    {/* Ideal Clients */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Ideal Clients:</h3>
                      <ul className="space-y-2">
                        {service.idealClients.map((client, clientIndex) => (
                          <li key={clientIndex} className="flex items-start text-gray-600">
                            <span className="text-blue-600 mr-2 font-bold">→</span>
                            <span>{client}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className={`flex justify-center ${index === 0 ? 'mb-16' : ''}`}>
                      <Button 
                        onClick={goToContactForm}
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                      >
                        {service.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Horizontal Divider between services */}
                {index < services.length - 1 && (
                  <div className="border-t border-gray-200 my-16"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* When to Use Which Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">When to Use Which Service</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These services address different needs at different stages of your journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Thought Leadership & Personal Branding if:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You want to establish authority in your niche over the long term</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You're promoting products, services, or your platform</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You need consistent LinkedIn presence but don't have the time</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You want to grow your network and attract opportunities organically</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You're building credibility that will serve you for years</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">
                This is a long-term investment in your professional brand. Results compound over months and years as your authority grows and your network expands.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Presale Marketing Agency if:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You're launching a presale or ICO in the next 30-90 days</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You need to fill your whitelist and build investor awareness quickly</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You require high-volume content production and strategic distribution</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You want professional campaign management during your launch</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>You need content that educates investors and drives conversions</span>
                </li>
              </ul>
              <p className="text-gray-600 italic">
                This is a focused campaign with clear timelines and conversion goals. Results are measured by whitelist growth, community engagement, and campaign performance.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Use Both Services if:</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You're building long-term authority while preparing for a token launch. Your thought leadership content attracts attention to your expertise and project. Your presale campaign converts that attention into investor participation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Some founders start with thought leadership to build authority over 6-12 months, then launch a presale campaign when ready to raise capital. Others run both simultaneously if timelines align. There's no single right approach. The strategy depends on your current priorities, timeline, and goals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discuss Your Content Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-6 leading-relaxed">
            Whether you need ongoing thought leadership support or a focused presale campaign, we can help.
          </p>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Schedule a 30-minute strategy call to discuss your current situation and goals, which service aligns with your priorities, our approach to working together, and timeline and next steps.
          </p>
          <p className="text-base text-blue-200 mb-8 italic">
            No sales pressure. Just a clear conversation about whether we're a good fit.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={goToContactForm}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Book Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}