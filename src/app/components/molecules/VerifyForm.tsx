import { FormEvent } from "react";

interface VerifyFormProps {
    handleVerify: (e: FormEvent) => void;
    code: string;
    setCode: (value: string) => void;
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 md:p-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Verification Code</h1>
                <form onSubmit={handleVerify}>
                    <div className="mb-6">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Enter your verification code
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
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        Complete Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyForm;
