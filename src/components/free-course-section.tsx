import { Button } from './ui/button'
import { Input } from './ui/input'

export function FreeCourseSection() {
  return (
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
  )
}

