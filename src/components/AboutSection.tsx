"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Code, Coffee, Lightbulb, Target } from "lucide-react";

const stats = [
    { label: "Years Experience", value: "3+", icon: Code },
    { label: "Projects Completed", value: "10+", icon: Target },
    { label: "Cups of Coffee", value: "1000+", icon: Coffee },
    { label: "Ideas Implemented", value: "100+", icon: Lightbulb },
];

const highlights = [
    "Cloud computing & DevOps",
    "Flutter Mobile app development",
    "Database design & optimization",
    "Full-stack web development",
    "Responsive UI/UX design",
    "Performance optimization",
];

export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-gradient-to-b from-black to-purple-950/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">About Me</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Passionate developer crafting digital experiences with modern technologies
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Profile Card */}
                        <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 glow-purple">
                            <CardContent className="p-8">
                                <div className="flex items-center space-x-6 mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Avatar className="w-24 h-24 border-4 border-purple-500 glow-purple">
                                            <AvatarImage src="/profile-image.jpg" alt="Suraj Kumar Sahu" />
                                            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                                                Suraj Kumar Sahu
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Suraj Kumar Sahu</h3>
                                        <p className="text-purple-300 text-lg">Software Developer</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-300 leading-relaxed">
                                        I&apos;m a passionate software developer with 3+ years of experience building
                                        modern mobile app and web applications. I love turning complex problems into simple,
                                        beautiful solutions using cutting-edge technologies.
                                    </p>

                                    <p className="text-gray-300 leading-relaxed">
                                        When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                                        contributing to open-source projects, or sharing knowledge with the
                                        developer community. I believe in writing clean, maintainable code
                                        that makes a difference.
                                    </p>
                                </div>

                                {/* Skills Highlights */}
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-purple-300 mb-3">Areas of Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {highlights.map((skill, index) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-purple-600/20 border-purple-500/30 text-purple-200 hover:bg-purple-600/30 transition-colors"
                                                >
                                                    {skill}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Right Content - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                    >
                                        <Card className="bg-gradient-to-br from-purple-900/10 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-center group">
                                            <CardContent className="p-6">
                                                <motion.div
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="mb-4"
                                                >
                                                    <Icon className="w-8 h-8 text-purple-400 mx-auto group-hover:text-purple-300 transition-colors" />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                                                    viewport={{ once: true }}
                                                    className="text-3xl font-bold text-gradient mb-2"
                                                >
                                                    {stat.value}
                                                </motion.div>
                                                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Additional Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-r from-purple-900/20 via-black to-purple-900/20 border-purple-500/30">
                                <CardContent className="p-8 text-center">
                                    <h4 className="text-xl font-bold text-white mb-4">
                                        Always Learning, Always Growing
                                    </h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        Technology evolves rapidly, and so do I. I&apos;m constantly exploring
                                        new frameworks, tools, and methodologies to stay at the forefront
                                        of software development. My goal is to create impactful solutions
                                        that make a difference.
                                    </p>
                                    <motion.div
                                        className="mt-6 w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 64 }}
                                        transition={{ delay: 1, duration: 0.8 }}
                                        viewport={{ once: true }}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
