'use client'

export default function AuthErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-3xl font-bold">An authentication error occurred. Please try again!</h1>
            <a href="/" className="mt-6 underline">
                Go Home
            </a>
        </div>
    );
}