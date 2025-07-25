"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Home, User, Code, Briefcase, FileText, Gamepad2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#projects", label: "Projects", icon: Code },
    { href: "#skills", label: "Skills", icon: Briefcase },
    { href: "#resume", label: "Resume", icon: FileText },
    { href: "/snake-game", label: "Snake Game", icon: Gamepad2 },
    { href: "#contact", label: "Contact", icon: Mail },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Update active section based on scroll position
            const sections = navItems.filter(item => item.href.startsWith("#"));
            for (const item of sections) {
                const element = document.querySelector(item.href);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(item.href);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/90 backdrop-blur-md border-b border-purple-500/20"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2"
                    >
                        <Link href="/" className="text-2xl font-bold text-gradient">
                            SKS
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.href ||
                                    (item.href === "/" && activeSection === "");

                                return (
                                    <motion.div
                                        key={item.href}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.href.startsWith("#") ? (
                                            <button
                                                onClick={() => scrollToSection(item.href)}
                                                className={cn(
                                                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                                                    isActive
                                                        ? "bg-purple-600 text-white"
                                                        : "text-gray-300 hover:text-white hover:bg-purple-600/20"
                                                )}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                                                    "text-gray-300 hover:text-white hover:bg-purple-600/20"
                                                )}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-purple-600/20"
                                >
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-72 bg-black/95 backdrop-blur-md border-l border-purple-500/20"
                            >
                                <div className="flex flex-col space-y-4 mt-8">
                                    <div className="text-2xl font-bold text-gradient mb-8">
                                        Suraj Kumar Sahu
                                    </div>
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = activeSection === item.href ||
                                            (item.href === "/" && activeSection === "");

                                        return (
                                            <motion.div
                                                key={item.href}
                                                whileHover={{ x: 10 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {item.href.startsWith("#") ? (
                                                    <button
                                                        onClick={() => scrollToSection(item.href)}
                                                        className={cn(
                                                            "flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 text-left",
                                                            isActive
                                                                ? "bg-purple-600 text-white"
                                                                : "text-gray-300 hover:text-white hover:bg-purple-600/20"
                                                        )}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        <span className="font-medium">{item.label}</span>
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href={item.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={cn(
                                                            "flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200",
                                                            "text-gray-300 hover:text-white hover:bg-purple-600/20"
                                                        )}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        <span className="font-medium">{item.label}</span>
                                                    </Link>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
