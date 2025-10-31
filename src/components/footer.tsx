import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

interface FooterProps {
  onPageChange: (page: string, postId?: string) => void
}

export function Footer({ onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', id: 'about' },
      { name: 'Services', id: 'services' },
      { name: 'Blog', id: 'blog' },
      { name: 'Contact', id: 'contact' }
    ],
    services: [
      { name: 'Content Strategy', id: 'content-strategy' },
      { name: 'Social Marketing', id: 'social-marketing' },
      { name: 'Email Marketing', id: 'email-marketing' },
      { name: 'SEO Optimization', id: 'seo' }
    ],
    resources: [
      { name: 'Case Studies', id: 'case-studies' },
      { name: 'Whitepapers', id: 'whitepapers' },
      { name: 'Webinars', id: 'webinars' },
      { name: 'Free Tools', id: 'tools' }
    ]
  }

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', name: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', name: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', name: 'Instagram' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">MacLabs</h3>
                <p className="text-gray-400 leading-relaxed">
                  Empowering crypto founders to build authority, attract investors, and scale their Web3 projects 
                  through strategic ghostwriting and crypto-native marketing.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">sam.daodu@maclabsmarketing.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">+447831692196</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm">Nottingham, UK</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onPageChange(link.id)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onPageChange('services')}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => onPageChange(link.id)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} MacLabs. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="hover:text-white transition-colors">
                Cookie Policy
              </button>
              {/* Admin link removed from public footer */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}