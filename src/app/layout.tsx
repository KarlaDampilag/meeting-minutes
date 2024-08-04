import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/providers/Providers";
import TopNav from "./components/layout/TopNav";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Meeting Minutes",
    description: "Meeting Minutes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <main>
                        <div className='root-container'>
                            <TopNav />
                            <div className='root-main-container'>{children}</div>
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
