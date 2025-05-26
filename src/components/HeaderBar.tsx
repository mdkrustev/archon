"use client"

import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import HeaderLanguages from "./HeaderLanguages";
import { useTranslationContext } from '@/i18n/TranslationContext'

export default function HeaderBar() {

    const { t, locale, localizePath } = useTranslationContext();

    return (
        <header className="bg-white h-[60px]">
            <nav aria-label="Global" className="flex w-full justify-between">
                <div className="flex w-[260px] justify-center pt-[8px]">
                    <Link href={localizePath('/')} className="cursor-pointer">
                        <img alt="" src="/img/archon-logo.svg" className="h-9 w-auto" />
                    </Link>
                </div>
                <div className="flex flex-grow">
                    <div className="flex flex-grow"></div>
                    <div className="w-[200px] flex mt-2">
                        <HeaderLanguages />
                        <HeaderAuth />
                    </div>
                </div>
            </nav>
        </header>
    )
}