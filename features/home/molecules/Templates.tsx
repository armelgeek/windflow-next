import React from 'react'

const Templates = () => {
  return (
    <section id="templates" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Templates prêts à l'emploi</h2>
            <a href="#" className="text-gray-600 hover:text-black flex items-center">
              Voir tous les templates
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-100">
                <img src="/api/placeholder/400/300" alt="Template Landing Page" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all">
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium transition-all">
                    Prévisualiser
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">Landing Page</h3>
                <p className="text-sm text-gray-600">Parfait pour présenter vos produits</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-100">
                <img src="/api/placeholder/400/300" alt="Template SaaS Dashboard" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all">
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium transition-all">
                    Prévisualiser
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">Dashboard SaaS</h3>
                <p className="text-sm text-gray-600">Interface utilisateur élégante</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-100">
                <img src="/api/placeholder/400/300" alt="Template E-commerce" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all">
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium transition-all">
                    Prévisualiser
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">E-commerce</h3>
                <p className="text-sm text-gray-600">Boutique en ligne complète</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative h-48 bg-gray-100">
                <img src="/api/placeholder/400/300" alt="Template Chatbot" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all">
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium transition-all">
                    Prévisualiser
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold">Chatbot</h3>
                <p className="text-sm text-gray-600">Service client automatisé</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Templates
