export function TrustedBySection() {
  const trustedCompanies = [
    { name: 'TechCorp', logo: '🚀' },
    { name: 'GrowthCo', logo: '📈' },
    { name: 'InnovateHub', logo: '💡' },
    { name: 'ScaleUp', logo: '⚡' },
    { name: 'FutureGen', logo: '🌟' },
    { name: 'NextLevel', logo: '🎯' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted By</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join hundreds of companies that have transformed their digital presence with our expertise
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {trustedCompanies.map((company, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {company.logo}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Don't see your brand here? Let's start building your success story together.
          </p>
        </div>
      </div>
    </section>
  )
}