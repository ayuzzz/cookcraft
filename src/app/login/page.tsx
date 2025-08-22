"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useAiStore } from "@/store/aiStore";

export default function LoginPage() {
    const {data, status} = useSession() as { data: Session | null, status: "authenticated" | "unauthenticated" | "loading" };

    const handleLogout = async () => {
        // Clear all stores before logging out
        useAiStore.getState().clearStore();
        await signOut();
    }

    return (
        <div
            className="container flex flex-col items-center justify-start mx-auto py-8"
        >
            {status === "unauthenticated" ? 
            (<>
                <h1 className="text-2xl font-bold mb-4">Login to CookCraft</h1>
                <button
                    onClick={() => signIn("google", {callbackUrl: "/"})}
                    className="bg-red-600 text-white px-4 py-2 rounded mb-2 cursor-pointer"
                >
                    <i className="fa-brands fa-google-plus-g text-2xl"></i> <span className="text-xl">Sign in with Google</span>
                </button>
            </>) : (
            <>
                <h1 className="text-2xl font-bold mb-4">Logout from CookCraft</h1>
                <p className="text-gray-600">
                    {data ? `Welcome, ${data.user?.name}` : "Please sign in to continue."}
                </p>
                <button
                    onClick={() => handleLogout()}
                    className="bg-red-600 text-white px-4 py-2 rounded mt-2 cursor-pointer"
                >
                    <span className="text-xl">Sign out</span>
                </button>
            </>)}
        </div>
    );
}
