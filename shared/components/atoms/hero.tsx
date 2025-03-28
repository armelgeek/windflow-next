import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-28 pb-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Créez des sites web sans code</h1>
        <p className="text-xl md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Un constructeur visuel puissant et intuitif pour créer des sites web professionnels sans écrire une seule ligne de code.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-32">
          <Link href={'/login'} className="px-8 py-3 bg-black text-white text-lg rounded-md hover:bg-gray-800 transition-all">
            Essayer gratuitement
          </Link>
          <button className="px-8 py-3 border border-gray-200 text-lg rounded-md hover:border-gray-400 transition-all">
            Voir la démo
          </button>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 right-6 bottom-6 border-2 border-gray-100 rounded-lg"></div>
          <div className="relative border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <img src="/windflow.png" alt="Interface du constructeur visuel" className="w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
