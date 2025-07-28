import Link from "next/link";
import Image from "next/image";

export const Navbar = () =>
{
    const navLinks = [
        {href: "/", label: "Home"},
        {href: "/log", label: "Log"},
        {href: "/dashboard", label: "Dashboard"},
        {href: "/history", label: "History"},
        {href: "/ask-ai", label: "Ask AI"},
    ];

    return (
        <div className="bg-[var(--primary-color)] container mx-auto flex gap-4 items-center justify-between px-4 py-3 shadow-lg">
            <Image
                src="/favicon.ico"
                alt="CookCraft Logo"
                width={40}
                height={40}
            />
            <Link href="/" className="text-xl font-bold">
                CookCraft
            </Link>

            <nav className="flex-grow flex gap-6 justify-end px-4 py-3">
                {navLinks.map((link) => 
                    <Link href={link.href} key={link.label} className="text-[var(--primary-text-color)] hover:text-white text-lg font-semibold">
                        {link.label}
                    </Link>
                )}
            </nav>
        </div>
    );
}