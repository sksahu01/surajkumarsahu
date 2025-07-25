"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const skillCategories = [
    {
        title: "Frontend Development",
        icon: "🎨",
        skills: [
            { name: "React", level: 95, color: "from-blue-500 to-blue-600" },
            { name: "Next.js", level: 90, color: "from-gray-700 to-gray-800" },
            { name: "TypeScript", level: 88, color: "from-blue-600 to-blue-700" },
            { name: "Tailwind CSS", level: 92, color: "from-cyan-500 to-cyan-600" },
            { name: "JavaScript", level: 95, color: "from-yellow-500 to-yellow-600" },
            { name: "HTML/CSS", level: 98, color: "from-orange-500 to-orange-600" },
        ]
    },
    {
        title: "Backend Development",
        icon: "⚙️",
        skills: [
            { name: "Node.js", level: 85, color: "from-green-500 to-green-600" },
            { name: "Python", level: 80, color: "from-blue-500 to-yellow-500" },
            { name: "Express.js", level: 88, color: "from-gray-600 to-gray-700" },
            { name: "MongoDB", level: 82, color: "from-green-600 to-green-700" },
            { name: "PostgreSQL", level: 78, color: "from-blue-600 to-blue-700" },
            { name: "REST APIs", level: 90, color: "from-purple-500 to-purple-600" },
        ]
    },
    {
        title: "Tools & Technologies",
        icon: "🛠️",
        skills: [
            { name: "Git", level: 92, color: "from-orange-500 to-red-500" },
            { name: "Docker", level: 75, color: "from-blue-500 to-blue-600" },
            { name: "AWS", level: 70, color: "from-orange-400 to-orange-500" },
            { name: "Firebase", level: 85, color: "from-yellow-500 to-orange-500" },
            { name: "Vercel", level: 88, color: "from-gray-700 to-black" },
            { name: "VS Code", level: 95, color: "from-blue-500 to-blue-600" },
        ]
    },
    {
        title: "Design & Others",
        icon: "🎯",
        skills: [
            { name: "Figma", level: 75, color: "from-purple-500 to-pink-500" },
            { name: "UI/UX Design", level: 80, color: "from-pink-500 to-purple-500" },
            { name: "Mobile Development", level: 72, color: "from-green-500 to-blue-500" },
            { name: "Testing", level: 78, color: "from-red-500 to-pink-500" },
            { name: "Agile/Scrum", level: 85, color: "from-indigo-500 to-purple-500" },
            { name: "Team Leadership", level: 80, color: "from-yellow-500 to-orange-500" },
        ]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 bg-gradient-to-b from-purple-950/10 to-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">Skills & Technologies</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and proficiency levels
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 h-full">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-3 text-xl text-white">
                                        <span className="text-2xl">{category.icon}</span>
                                        <span>{category.title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <TooltipProvider key={skill.name}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: categoryIndex * 0.2 + skillIndex * 0.1
                                                        }}
                                                        viewport={{ once: true }}
                                                        className="group cursor-pointer"
                                                    >
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                                                {skill.name}
                                                            </span>
                                                            <Badge
                                                                variant="secondary"
                                                                className="bg-purple-600/20 text-purple-200 border-purple-500/30"
                                                            >
                                                                {skill.level}%
                                                            </Badge>
                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                                            <motion.div
                                                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${skill.level}%` }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                                                                    ease: "easeOut"
                                                                }}
                                                                viewport={{ once: true }}
                                                            >
                                                                {/* Glow effect */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-purple-900 border-purple-500/50 text-white">
                                                    <p>Proficiency: {skill.level}%</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <Card className="bg-gradient-to-r from-purple-900/10 via-black to-purple-900/10 border-purple-500/20">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-6">Always Learning</h3>
                            <p className="text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                                Technology never stops evolving, and neither do I. I&apos;m constantly expanding my skill set,
                                exploring new frameworks, and staying up-to-date with industry best practices to deliver
                                cutting-edge solutions.
                            </p>

                            {/* Currently Learning */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {["GraphQL", "Kubernetes", "Machine Learning", "Blockchain", "Web3", "Rust"].map((tech, index) => (
                                    <motion.div
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Badge
                                            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all cursor-pointer border-0"
                                        >
                                            🚀 {tech}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
