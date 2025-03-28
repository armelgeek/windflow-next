import React from 'react'

const Pricing = () => {
    return (
        <section id="pricing" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Plans simples et transparents</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all">
                        <h3 className="text-xl font-bold mb-4">Starter</h3>
                        <div className="text-4xl font-bold mb-2">Gratuit</div>
                        <p className="text-gray-600 mb-6">Parfait pour démarrer et tester</p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                1 projet
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Templates basiques
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Exportation de code
                            </li>
                        </ul>

                        <button className="w-full py-3 border border-gray-300 rounded-md hover:border-gray-500 transition-all">
                            Commencer
                        </button>
                    </div>

                    <div className="border-2 border-black rounded-lg p-8 relative shadow-lg">
                        <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 transform translate-y-0 translate-x-0 rounded-bl-lg rounded-tr-lg">
                            POPULAIRE
                        </div>
                        <h3 className="text-xl font-bold mb-4">Pro</h3>
                        <div className="text-4xl font-bold mb-2">29€<span className="text-xl text-gray-600">/mois</span></div>
                        <p className="text-gray-600 mb-6">Pour les freelances et petites équipes</p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                10 projets
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Tous les templates
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Exportation de code
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Support prioritaire
                            </li>
                        </ul>

                        <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all">
                            Commencer l'essai gratuit
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all">
                        <h3 className="text-xl font-bold mb-4">Entreprise</h3>
                        <div className="text-4xl font-bold mb-2">99€<span className="text-xl text-gray-600">/mois</span></div>
                        <p className="text-gray-600 mb-6">Pour les équipes et agences</p>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Projets illimités
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Tous les templates premium
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Exportation avancée et API
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Support dédié
                            </li>
                        </ul>

                        <button className="w-full py-3 border border-gray-300 rounded-md hover:border-gray-500 transition-all">
                            Contacter les ventes
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
