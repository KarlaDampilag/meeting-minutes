"use client";

import { deDE } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import ReactQueryProvider from "./ReactQueryProvider";

export default function Providers(props: React.PropsWithChildren) {
    return (
        <>
            <ReactQueryProvider>
                <ClerkProvider localization={deDE}>
                        <NextUIProvider>
                            {props.children}
                            <ToastContainer />
                        </NextUIProvider>
                </ClerkProvider>
            </ReactQueryProvider>
        </>
    )
}