"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import FloatingCube to prevent SSR issues
const FloatingCube = dynamic(() => import("@/components/FloatingCube"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-500/30 rounded-lg"></div>
            </div>
        </div>
    )
});

const socialLinks = [
    {
        href: "https://www.linkedin.com/in/surajkumarsahu01/",
        icon: Linkedin,
        label: "LinkedIn",
        color: "hover:text-blue-400"
    },
    {
        href: "https://github.com/surajkumarsahu01",
        icon: Github,
        label: "GitHub",
        color: "hover:text-gray-400"
    },
    {
        href: "mailto:surajkumarsahu@email.com",
        icon: Mail,
        label: "Email",
        color: "hover:text-red-400"
    }
];

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.querySelector("#about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-purple-950/20 to-black">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Greeting */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-6"
                        >
                            <span className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                                👋 Hello, I&apos;m
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
                        >
                            <span className="text-gradient">Suraj Kumar</span>
                            <br />
                            <span className="text-white">Sahu</span>
                        </motion.h1>

                        {/* Title with Typewriter Effect */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl sm:text-2xl text-purple-300 mb-6 font-medium"
                        >
                            Software Developer
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed"
                        >
                            Passionate about creating innovative solutions through code.
                            Specialized in full-stack development with modern technologies,
                            bringing ideas to life with clean, efficient, and scalable applications.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 glow-purple group"
                                onClick={() => scrollToAbout()}
                            >
                                <span>View My Work</span>
                                <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download Resume
                            </Button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex justify-center lg:justify-start space-x-6"
                        >
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-gray-400 ${social.color} transition-colors duration-200`}
                                        whileHover={{ scale: 1.2, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.4 + index * 0.1 }}
                                    >
                                        <Icon className="w-6 h-6" />
                                        <span className="sr-only">{social.label}</span>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - 3D Cube */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md h-96">
                            {mounted ? (
                                <FloatingCube mousePosition={mousePosition} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg animate-pulse flex items-center justify-center">
                                        <div className="w-16 h-16 bg-purple-500/30 rounded-lg"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.button
                    onClick={scrollToAbout}
                    className="flex flex-col items-center text-purple-300 hover:text-purple-200 transition-colors group"
                    whileHover={{ y: -2 }}
                >
                    <span className="text-sm mb-2 opacity-70">Scroll Down</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-8 bg-gradient-to-b from-purple-400 to-transparent rounded-full"
                    />
                </motion.button>
            </motion.div>
        </section>
    );
}
