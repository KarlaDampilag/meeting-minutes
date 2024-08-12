import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Providers from "@/providers/Providers";
import TopNav from "./components/layout/TopNav";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}> {/** Not part of Providers component because getMessages() is server-side */}
                    <Providers>
                        <main>
                            <div className='root-container'>
                                <TopNav />
                                <div className='root-main-container'>{children}</div>
                            </div>
                        </main>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
