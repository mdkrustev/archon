"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


import { TranslationProvider } from '@/i18n/TranslationContext'

interface Props {
    children: ReactNode;
}

export default function Providers(props: Props) {
    return <SessionProvider>
        <TranslationProvider>
            {props.children}
        </TranslationProvider>
    </SessionProvider>
}