'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/post', label: 'Post' },
    { href: '/products', label: 'Products' },
    { href: '/books', label: 'Books' },
];

const isActiveLink = (pathname, href) => {
    if (href === '/') {
        return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
};

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-100/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between rounded-[1.75rem] border border-white/80 bg-white/80 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#67e8f9_100%)] text-lg font-bold text-white shadow-[0_12px_24px_rgba(29,78,216,0.24)]">
                            A
                        </span>
                        <div>
                            <p className="text-lg font-bold tracking-tight text-slate-900">
                                Advanced Fetch
                            </p>
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-700">
                                Data practice app
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-2 lg:flex">
                        {navLinks.map((link) => {
                            const isActive = isActiveLink(pathname, link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive
                                        ? 'bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.16)]'
                                        : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 lg:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="mt-3 rounded-[1.5rem] border border-white/80 bg-white/90 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] lg:hidden">
                        <nav className="grid gap-2">
                            {navLinks.map((link) => {
                                const isActive = isActiveLink(pathname, link.href);

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive
                                            ? 'bg-slate-900 text-white'
                                            : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
