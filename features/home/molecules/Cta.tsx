import Link from 'next/link'
import React from 'react'

const Cta = () => {
    return (
        <section className="py-20 bg-black text-white px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à créer quelque chose d'incroyable ?</h2>
                <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
                    Rejoignez des milliers de créateurs qui construisent l'avenir du web avec Windflow.
                </p>
                <Link href={"/"} className="px-8 py-3 bg-white text-black rounded-md text-lg font-medium hover:bg-gray-100 transition-all">
                    Commencer gratuitement
                </Link>
            </div>
        </section>
    )
}

export default Cta
