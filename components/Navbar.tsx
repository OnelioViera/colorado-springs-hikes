"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Trails", href: "/trails" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "bg-white shadow-lg"
            : "bg-black/20 backdrop-blur-sm"
          : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isHomePage && !isScrolled ? "text-white" : "text-blue-600"
                }`}
              >
                CS Hikes
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? isHomePage && !isScrolled
                        ? "border-white text-white"
                        : "border-blue-500 text-gray-900"
                      : isHomePage && !isScrolled
                        ? "border-transparent text-white/80 hover:border-white/50 hover:text-white"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth buttons and mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Auth buttons - Desktop */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                      isHomePage && !isScrolled
                        ? "border-transparent text-white/80 hover:border-white/50 hover:text-white"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center space-x-4">
                  <UserButton afterSignOutUrl="/" />
                  <Link
                    href="/studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                      isHomePage && !isScrolled
                        ? "border-transparent text-white/80 hover:border-white/50 hover:text-white"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Studio
                  </Link>
                  <SignOutButton>
                    <button
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300 ${
                        isHomePage && !isScrolled
                          ? "border-transparent text-white/80 hover:border-white/50 hover:text-white"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isHomePage && !isScrolled
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:hidden`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div
          className={`pt-2 pb-3 space-y-1 ${
            isHomePage && !isScrolled
              ? "bg-black/90 backdrop-blur-sm"
              : "bg-white"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
                pathname === item.href
                  ? isHomePage && !isScrolled
                    ? "bg-white/10 border-white text-white"
                    : "bg-gray-50 border-gray-500 text-gray-700"
                  : isHomePage && !isScrolled
                    ? "border-transparent text-white/80 hover:bg-white/10 hover:border-white/50 hover:text-white"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Auth buttons - Mobile */}
          <div className="px-3 py-2">
            {isSignedIn ? (
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button
                  className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isHomePage && !isScrolled
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
