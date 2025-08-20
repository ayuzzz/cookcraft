'use client';
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";

export const Navbar = () =>
{
    const {data, status} = useSession() as { data: Session | null, status: "authenticated" | "unauthenticated" | "loading" };;
    const navLinks = [
        {href: "/", label: "Home"},
        {href: "/log", label: "Log Meal"},
        {href: "/dashboard", label: "Dashboard"},
        {href: "/history", label: "History"},
        {href: "/assistant", label: "Ask AI"}
    ];

    return (
        <div className="bg-[var(--primary-color)] flex gap-4 items-center justify-between px-4 py-3 shadow-lg">
            <Image
                src="/images/icon.ico"
                alt="CookCraft Logo"
                width={60}
                height={60}
                className="cursor-pointer"
            />
            <Link href="/" className="text-xl font-bold">
                CookCraft
            </Link>

            <nav className="flex-grow flex gap-6 justify-end px-4 py-3">
                {navLinks.map((link) => 
                        <Link key={link.label} href={link.href} className="text-[var(--primary-text-color)] hover:text-white text-lg font-semibold">
                            {link.label}
                        </Link>
                )}
                {status === "unauthenticated" ? (
                            <Link key="login" href="/login" className="text-[var(--primary-text-color)] hover:text-white text-lg font-semibold">
                                Login
                            </Link>
                        ) : (
                            <React.Fragment key={data?.user?.id}>
                                <Link key="logout" href="/login" className="text-[var(--primary-text-color)] hover:text-white text-lg font-semibold">
                                    Logout
                                </Link>
                                {data?.user?.image ? (
                                    <img src={data.user.image} alt="User Avatar" className="w-9 h-9 rounded-full ml-2" />
                                ) : null}
                            </React.Fragment>
                        )}
            </nav>
        </div>
    );
}