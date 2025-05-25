"use client"

import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderLanguages from "./ui/HeaderLanguages";
import { useTranslationContext } from '@/i18n/TranslationContext'

export default function HeaderBar() {

    const {t} = useTranslationContext();

    return (
        <header className="bg-white text-[18px]">
            <nav aria-label="Global" className="flex w-full justify-between">
                <div className="flex w-[120px]">
                    <Link href={'/'} className="cursor-pointer">
                        <img alt="" src="/img/archon-logo.svg" className="h-9 w-auto" />
                    </Link>
                </div>
                <div className="flex flex-grow pt-2">
                   
                    <div className="flex flex-grow justify-center ">
                        <div className="ml-2">{t('products')}</div>
                        <div className="ml-10">Link 2</div>
                    </div>
                    <div className="w-[200px] flex">
                         <HeaderLanguages />
                        <HeaderAuth />
                    </div>
                </div>
            </nav>
        </header>
    )
}