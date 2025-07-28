"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, User, Code, Briefcase, FileText, Gamepad2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/lib/constants";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#projects", label: "Projects", icon: Code },
    { href: "#skills", label: "Skills", icon: Briefcase },
    { href: "#resume", label: "Resume", icon: FileText },
    { href: "#snake-game", label: "Snake Game", icon: Gamepad2 },
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
            let currentSection = "";

            // Check if we're at the top of the page
            if (window.scrollY < 100) {
                setActiveSection("");
                return;
            }

            // Find the section that is most prominently in view
            let maxVisibleArea = 0;

            for (const item of sections) {
                const element = document.querySelector(item.href) as HTMLElement;
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    // Calculate how much of the section is visible
                    const visibleTop = Math.max(0, rect.top);
                    const visibleBottom = Math.min(viewportHeight, rect.bottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                    // Consider a section active if it has significant visible area
                    // and is near the top of the viewport
                    if (visibleHeight > 0 && rect.top <= 200) {
                        if (visibleHeight > maxVisibleArea) {
                            maxVisibleArea = visibleHeight;
                            currentSection = item.href;
                        }
                    }
                }
            }

            setActiveSection(currentSection);
        };

        // Initial call to set the active section
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href) as HTMLElement;
            if (element) {
                const offset = 80; // Account for fixed navbar height
                const elementPosition = element.offsetTop;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        } else if (href === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
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
                            {PERSONAL_INFO.shortName}
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
                                        {item.href === "/" ? (
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
                                        {PERSONAL_INFO.name}
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
                                                {item.href === "/" ? (
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
