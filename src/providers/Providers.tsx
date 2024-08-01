"use client";

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
            <ClerkProvider>
                {props.children}
            </ClerkProvider>
            {/*  <ToastContainer />
                </NextUIProvider>
            </ReactQueryProvider> */}
        </>
    )
}