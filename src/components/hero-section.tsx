import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
  onSeeOurWork?: () => void
}

export function HeroSection({ onGetStarted, onSeeOurWork }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              MacLabs helps crypto founders with two specialized services:
            </h1>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Building thought leadership and personal brands on LinkedIn.
            </p>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Running full-service presale marketing campaigns for token launches.
            </p>
            <p className="text-lg text-gray-500 mb-8 italic">
              "We've worked with crypto founders featured in CoinTelegraph, Yahoo Finance, and The Block"
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Book A Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={onSeeOurWork}
              >
                Our Services
              </Button>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Card */}
              <div className="col-span-2 bg-white rounded-2xl shadow-xl p-6 transform rotate-1">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Thought leadership</h3>
                <p className="text-sm text-gray-600">
                  Build authority and influence that attracts investors and builds trust
                </p>
              </div>

              {/* Analytics Card */}
              <div className="bg-white rounded-xl shadow-lg p-4 transform -rotate-2">
                <div className="bg-green-100 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-800">Growth</span>
                    <span className="text-green-600 font-bold">+247%</span>
                  </div>
                </div>
                <div className="h-12 bg-gradient-to-r from-green-200 to-green-400 rounded opacity-75"></div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white rounded-xl shadow-lg p-4 transform rotate-2">
                <div className="bg-purple-100 rounded-lg p-3 mb-3">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-purple-400 rounded h-2"></div>
                    <div className="bg-purple-300 rounded h-2"></div>
                    <div className="bg-purple-500 rounded h-2"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Social Engagement</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-10 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}