import React, { FormEvent } from "react";
import { Button, cn } from "@nextui-org/react";

import Text from "../atoms/Text";

interface VerifyFormProps {
    handleVerify: (e: FormEvent) => void;
    code: string;
    setCode: (value: string) => void;
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 md:p-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    <Text localeParent="Auth" localeKey="Verification Code" />
                </h1>
                <form onSubmit={(e) => {
                    setIsLoading(true);
                    handleVerify(e);
                }}>
                    <div className="mb-6">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            <Text localeParent="Auth" localeKey="Enter your verification code" />
                        </label>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            id="code"
                            name="code"
                            type="text"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123456"
                            required
                        />
                    </div>
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
                        <Text localeParent="Auth" localeKey="Complete Sign Up" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyForm;
