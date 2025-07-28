"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Mail,
    Heart,
    ArrowUp,
    Code,
    Coffee
} from "lucide-react";

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/sksahu01",
        color: "hover:text-gray-400"
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://linkedin.com/in/surajkumarsahu01",
        color: "hover:text-blue-400"
    },
    {
        name: "Twitter",
        icon: Twitter,
        href: "https://x.com/sksahu_exe",
        color: "hover:text-sky-400"
    },
    {
        name: "Instagram",
        icon: Instagram,
        href: "https://linkedin.com/in/surajkumarsahu01",
        color: "hover:text-pink-400"
    }
];

const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
    { name: "Snake Game", href: "#snake-game" }
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-gradient-to-t from-black via-purple-950/20 to-black border-t border-purple-500/20">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg">
                                <Code className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Suraj Kumar Sahu</h3>
                                <p className="text-purple-300">Software Developer</p>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                            Passionate about creating innovative digital solutions that make a difference.
                            I bring ideas to life through clean code, modern design, and cutting-edge technology.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1 }}
                                    className={`p-3 bg-purple-600/20 rounded-lg text-gray-400 transition-all hover:bg-purple-600/30 ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-400 hover:text-purple-300 transition-colors duration-200 text-left"
                                    >
                                        {link.name}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-lg font-bold text-white mb-6">Get In Touch</h4>
                        <div className="space-y-4">
                            <a
                                href="mailto:surajkumarsahu01@gmail.com"
                                className="flex items-center space-x-3 text-gray-400 hover:text-purple-300 transition-colors duration-200"
                            >
                                <Mail className="w-5 h-5" />
                                <span>surajsahu96685@gmail.com</span>
                            </a>

                            <div className="pt-4">
                                <Button
                                    onClick={() => scrollToSection('#contact')}
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                >
                                    Start a Project
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Bottom Footer */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-gray-400 text-sm"
                    >
                        <span>© {new Date().getFullYear()} Suraj Kumar Sahu. Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>and</span>
                        <Coffee className="w-4 h-4 text-amber-500" />
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-gray-400 text-sm"
                    >
                        <span>Built with</span>
                        <span className="text-purple-300 font-medium">Next.js</span>
                        <span>•</span>
                        <span className="text-purple-300 font-medium">Tailwind</span>
                        <span>•</span>
                        <span className="text-purple-300 font-medium">Framer Motion</span>
                    </motion.div>

                    {/* Back to Top */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Button
                            onClick={scrollToTop}
                            variant="outline"
                            size="sm"
                            className="border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white"
                        >
                            <ArrowUp className="w-4 h-4 mr-2" />
                            Back to Top
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-600/5 rounded-full blur-xl"
                />
            </div>
        </footer>
    );
}
