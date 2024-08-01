"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import SignupForm from "@/app/components/molecules/SignupForm";
import VerifyForm from "@/app/components/molecules/VerifyForm";


const Signup = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [clerkError, setClerkError] = useState("");
    const router = useRouter();
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState("");

    const signUpWithEmail = async ({
        firstName,
        lastName,
        emailAddress,
        password,
    }: {
        firstName: string;
        lastName: string;
        emailAddress: string;
        password: string;
    }) => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
            });
            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setVerifying(true);
        } catch (err: any) {
            setClerkError(err.errors[0].message);
        }
    };

    const handleVerify = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err) {
            console.log("Error:", JSON.stringify(err, null, 2));
        }
    };

    return (
        <>
            {!verifying ?
                (<SignupForm signUpWithEmail={signUpWithEmail} clerkError={clerkError} />) :
                (<VerifyForm handleVerify={handleVerify} code={code} setCode={setCode} />)
            }
        </>
    )

};

export default Signup;
