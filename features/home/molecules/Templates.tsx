import TemplateOverview from '@/features/templates/components/organisms/template-overview'
import Link from 'next/link'
import React from 'react'

const Templates = () => {
  return (
    <section id="templates" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Templates prêts à l'emploi</h2>
          <Link href="/templates" className="text-gray-600 hover:text-black flex items-center">
            Voir tous les templates
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <TemplateOverview />

      </div>
    </section>
  )
}

export default Templates
