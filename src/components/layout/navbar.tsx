import Link from "next/link";
import Image from "next/image";

export const Navbar = () =>
{
    const navLinks = [
        {href: "/", label: "Home"},
        {href: "/log", label: "Log Meal"},
        {href: "/dashboard", label: "Dashboard"},
        {href: "/history", label: "History"},
        {href: "/assistant", label: "Ask AI"},
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
                    <Link href={link.href} key={link.label} className="text-[var(--primary-text-color)] hover:text-white text-lg font-semibold">
                        {link.label}
                    </Link>
                )}
            </nav>
        </div>
    );
}