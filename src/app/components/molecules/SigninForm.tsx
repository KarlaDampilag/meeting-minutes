import { Button, cn } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface SignInFormProps {
    signInWithEmail: ({
        emailAddress,
        password,
    }: {
        emailAddress: string;
        password: string;
    }) => void;
    clerkError: string;
}

const SigninForm = ({ signInWithEmail, clerkError }: SignInFormProps) => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div className="flex justify-center items-center min-h-full">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 md:p-10">
                <h1 className="mb-6">
                    Sign In
                </h1>
                <form
                    onSubmit={(e) => {
                        setIsLoading(true);
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                            email: { value: string };
                            password: { value: string };
                        };
                        const email = target.email.value;
                        const password = target.password.value;
                        signInWithEmail({ emailAddress: email, password: password });
                    }}
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your password"
                            required
                        />
                    </div>
                    {clerkError && (
                        <div className="mb-4 text-red-600 text-sm">
                            {clerkError}
                        </div>
                    )}
                    <Button
                        variant='solid'
                        color={isLoading ? 'default' : 'primary'}
                        radius='sm'
                        fullWidth
                        className={cn('mt-6 h-12 font-bold', { 'cursor-not-allowed': isLoading })}
                        disabled={isLoading}
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don&apos;t have an account?
                    <Link href="/sign-up" className="ml-1 text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SigninForm;
