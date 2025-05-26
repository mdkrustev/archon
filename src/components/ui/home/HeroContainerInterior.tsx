// components/HeroContainerInterior.tsx

'use client';

import { useTranslationContext } from "@/i18n/TranslationContext";

export default function HeroContainerInterior() {

    const {t} = useTranslationContext()

    return (
        <section className="relative w-full h-[calc(100vh-60px)] bg-cover bg-center" style={{ backgroundImage: "url('/img/interior-container.jpg')" }}>
            {/* Полупрозрачен overlay */}
            <div style={{ backgroundColor: 'rgba(19, 131, 91, 0.5)' }} className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-6 max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 drop-shadow-lg">
                        {t('Mobile workstations')}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 drop-shadow-md">
                        {t('Intelligent management of objects and resources in real time')}. <br />
                        {t('Perfect for modular construction')}.
                    </p>
                    <a
                        href="/work-types"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        {t('Explore services')}
                    </a>
                </div>
            </div>
        </section>
    );
}