import React from 'react'

const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-50 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Tout ce dont vous avez besoin</h2>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-md flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Glisser-déposer</h3>
                        <p className="text-gray-600">Interface intuitive qui vous permet de construire n'importe quelle mise en page en quelques minutes.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-md flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Responsive</h3>
                        <p className="text-gray-600">Tous vos designs s'adaptent automatiquement à tous les appareils, de l'ordinateur au mobile.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-md flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Personnalisation</h3>
                        <p className="text-gray-600">Des centaines d'options de personnalisation pour que votre site reflète votre marque.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
