"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import SigninForm from "@/app/components/molecules/SigninForm";
import { QueryService } from "@/app/services/QueryService";

const Signin = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [clerkError, setClerkError] = useState("");
    const router = useRouter();

    const queryService = QueryService.getInstance();
    const searchParams = useSearchParams();
    const inviteId = searchParams.get('id');

    const signInWithEmail = async ({
        emailAddress,
        password,
    }: {
        emailAddress: string;
        password: string;
    }) => {
        if (!isLoaded) {
            return;
        }

        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });
            if (result.status === "complete") {
                console.log(result);
                await setActive({ session: result.createdSessionId });

                // if invite has accepted === null or undefined, redirect to accept-invite, else redirect to dashboard
                const pendingInvite = await queryService.fetchInviteByUserEmail(emailAddress);
                if (!!pendingInvite && (pendingInvite.accepted === null || pendingInvite.accepted === undefined)) {
                    router.push(`/accept-invite?id=${inviteId}`);
                } else {
                    router.push("/dashboard");
                }
            } else {
                console.log(result);
            }
        } catch (err: any) {
            console.log(JSON.stringify(err, null, 2));
            setClerkError(err.errors[0].message);
        }
    };

    return (
        <SigninForm signInWithEmail={signInWithEmail} clerkError={clerkError} />
    );
};

export default Signin;
