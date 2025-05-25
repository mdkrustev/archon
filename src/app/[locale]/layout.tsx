// app/[locale]/layout.tsx

import type { Metadata } from "next";
import "../style/globals.css";
import Providers from "@/components/Providers";
import HeaderBar from "@/components/HeaderBar";
import { dir } from 'i18next';

export const metadata: Metadata = {
  title: "Anchor",
  description: "Archon is a powerful cloud-based software platform designed specifically for the construction and installation industry...",
  icons: {
    icon: "/img/favicon.ico",
  },
  openGraph: {
    title: "Anchor",
    description: "Agentra is a smart CRM platform for real estate agencies...",
    url: "https://anchor.com",
    siteName: "Anchor",
    images: [
      {
        url: "https://anchor.vercel.app/img/archon-icon.png",
        width: 512,
        height: 512,
        alt: "Anchor",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {

  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <html lang={locale} dir={dir(locale)} >
      <body>
        <Providers>
          <div className="w-full p-[20px] max-w-[1920px] m-auto">
            <HeaderBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
