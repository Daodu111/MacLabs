import { ImageWithFallback } from './figma/ImageWithFallback'

export function TrustedBySection() {
  const trustedCompanies = [
    { 
      name: 'Coin Telegraph', 
      logo: '/media/Coin Telegraph.jpg',
      alt: 'Coin Telegraph logo'
    },
    { 
      name: 'Yahoo Finance', 
      logo: '/media/yahoo_finance_logo.jpg',
      alt: 'Yahoo Finance logo'
    },
    { 
      name: 'The Block', 
      logo: '/media/theblockcrypto_logo.jpg',
      alt: 'The Block logo'
    },
    { 
      name: 'Cryptonews', 
      logo: '/media/cryptonewscom_logo.jpg',
      alt: 'Cryptonews logo'
    },
    { 
      name: 'Zypto', 
      logo: '/media/zypto_logo.jpg',
      alt: 'Zypto logo'
    },
    { 
      name: 'Rain', 
      logo: '/media/rainfinancial_logo.jpg',
      alt: 'Rain Financial logo'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted By</h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic">
            "We've worked with crypto founders featured in CoinTelegraph, Yahoo Finance, and The Block"
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {trustedCompanies.map((company, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="w-16 h-10 mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <ImageWithFallback
                  src={company.logo}
                  alt={company.alt}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Recognized by industry leaders for our expertise in digital marketing and crypto communications.
          </p>
        </div>
      </div>
    </section>
  )
}