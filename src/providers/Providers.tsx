"use client";

import { deDE } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

// import { NextUIProvider } from "@nextui-org/react";
// import { ToastContainer } from "react-toastify";
// import ReactQueryProvider from "./ReactQueryProvider";

export default function Providers(props: React.PropsWithChildren) {
    return (
        <>
            {/* <ReactQueryProvider>
                <NextUIProvider>
            */}
            <ClerkProvider localization={deDE}>
                {props.children}
            </ClerkProvider>
            {/*  <ToastContainer />
                </NextUIProvider>
            </ReactQueryProvider> */}
        </>
    )
}