import { Button, cn } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface SignUpFormProps {
    signUpWithEmail: ({ firstName, lastName, emailAddress, password }: { firstName: string; lastName: string; emailAddress: string; password: string }) => void;
    clerkError: string;
}

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div className="flex justify-center items-center min-h-full">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 md:p-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h1>
                <form
                    onSubmit={(e) => {
                        setIsLoading(true);
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                            firstName: { value: string };
                            lastName: { value: string };
                            email: { value: string };
                            password: { value: string };
                        };
                        const firstName = target.firstName.value;
                        const lastName = target.lastName.value;
                        const email = target.email.value;
                        const password = target.password.value;
                        signUpWithEmail({ firstName, lastName, emailAddress: email, password });
                    }}
                >
                    <div className="mb-4 flex items-center gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Max"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Sander"
                                required
                            />
                        </div>
                    </div>
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
                        Create an account
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link href="/sign-in" className="ml-1 text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
