import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react'

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Format the date and time for Calendly URL
      const formattedDate = selectedDate
      const formattedTime = convertTo24Hour(selectedTime)
      
      // Create Calendly scheduling URL with prefilled data
      const calendlyUrl = new URL('https://calendly.com/your-username/30min') // Replace with your actual Calendly URL
      
      // Add prefill parameters
      calendlyUrl.searchParams.append('name', formData.name)
      calendlyUrl.searchParams.append('email', formData.email)
      if (formData.phone) calendlyUrl.searchParams.append('phone', formData.phone)
      
      // Add custom questions as URL parameters (if your Calendly event supports them)
      if (formData.company) calendlyUrl.searchParams.append('a1', formData.company) // Company
      if (formData.message) calendlyUrl.searchParams.append('a2', formData.message) // Goals/Message
      
      // Preferred date/time (Calendly will try to show this date/time if available)
      calendlyUrl.searchParams.append('date', formattedDate)
      calendlyUrl.searchParams.append('time', formattedTime)
      
      // Open Calendly in a new window/tab
      const calendlyWindow = window.open(calendlyUrl.toString(), '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes')
      
      if (calendlyWindow) {
        // Show success message
        alert(`Redirecting to Calendly to complete your booking for ${selectedDate} at ${selectedTime}. Your information has been pre-filled!`)
        
        // Optional: Reset form after successful redirect
        setSelectedDate('')
        setSelectedTime('')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
      } else {
        // Fallback if popup was blocked
        window.location.href = calendlyUrl.toString()
      }
      
    } catch (error) {
      console.error('Booking error:', error)
      alert('There was an error processing your booking request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to convert 12-hour to 24-hour format
  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    if (hours === '12') {
      hours = '00'
    }
    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString()
    }
    return `${hours}:${minutes}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Book Your Strategy Call Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Schedule a free 30-minute consultation to discuss your digital marketing goals 
            and discover how we can help accelerate your growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                  Select a Date & Time
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                        }`}
                      >
                        <Clock className="h-4 w-4 inline mr-2" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-blue-600" />
                  Your Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your goals
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="What are your main marketing challenges and goals?"
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2 text-center pt-6 border-t border-gray-200">
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4"
                  disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || isLoading}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {isLoading ? 'Booking...' : 'Book Strategy Call'}
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Free consultation • No commitment required • Powered by Calendly
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}