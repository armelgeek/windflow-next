import React from 'react'

const Testimonial = () => {
  return (
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <svg className="w-10 h-10 mx-auto mb-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-2xl md:text-3xl font-medium mb-6">
            "Windflow a transformé notre façon de créer des sites web. En quelques heures, nous avons pu mettre en ligne une landing page qui convertit à 15%."
          </p>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
            <div className="text-left">
              <div className="font-bold">Sophie Martin</div>
              <div className="text-gray-600">CMO, TechStartup</div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Testimonial
