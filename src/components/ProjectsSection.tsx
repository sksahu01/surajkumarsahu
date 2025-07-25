"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with modern design, secure payment integration, and admin dashboard. Built with Next.js, TypeScript, and Stripe.",
        image: "/projects/ecommerce.jpg",
        technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/surajkumarsahu01/ecommerce-platform",
        liveUrl: "https://ecommerce-demo.vercel.app",
        featured: true,
        status: "Completed",
        stars: 24
    },
    {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
        image: "/projects/taskmanager.jpg",
        technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Material-UI"],
        githubUrl: "https://github.com/surajkumarsahu01/task-manager",
        liveUrl: "https://taskmanager-demo.vercel.app",
        featured: true,
        status: "Completed",
        stars: 18
    },
    {
        id: 3,
        title: "Weather Analytics Dashboard",
        description: "Real-time weather data visualization with interactive charts, forecasts, and location-based insights using modern data visualization libraries.",
        image: "/projects/weather.jpg",
        technologies: ["Vue.js", "D3.js", "Python", "Flask", "Chart.js"],
        githubUrl: "https://github.com/surajkumarsahu01/weather-dashboard",
        liveUrl: "https://weather-analytics.vercel.app",
        featured: false,
        status: "Completed",
        stars: 15
    },
    {
        id: 4,
        title: "Social Media Dashboard",
        description: "Comprehensive social media analytics platform with multi-platform integration, engagement tracking, and automated reporting features.",
        image: "/projects/social.jpg",
        technologies: ["React", "Express.js", "MongoDB", "Chart.js", "JWT"],
        githubUrl: "https://github.com/surajkumarsahu01/social-dashboard",
        liveUrl: "https://social-dashboard-demo.vercel.app",
        featured: false,
        status: "Completed",
        stars: 21
    },
    {
        id: 5,
        title: "AI Chat Application",
        description: "Intelligent chat application with AI-powered responses, real-time messaging, and advanced natural language processing capabilities.",
        image: "/projects/aichat.jpg",
        technologies: ["Next.js", "OpenAI API", "WebSocket", "Redis", "Prisma"],
        githubUrl: "https://github.com/surajkumarsahu01/ai-chat-app",
        liveUrl: "https://ai-chat-demo.vercel.app",
        featured: true,
        status: "In Progress",
        stars: 32
    },
    {
        id: 6,
        title: "Portfolio Website",
        description: "This very portfolio website you're viewing! Built with Next.js, Shadcn UI, and featuring 3D animations, smooth transitions, and modern design.",
        image: "/projects/portfolio.jpg",
        technologies: ["Next.js", "Shadcn UI", "Three.js", "Framer Motion", "TypeScript"],
        githubUrl: "https://github.com/surajkumarsahu01/portfolio-website",
        liveUrl: "https://surajkumarsahu.dev",
        featured: true,
        status: "Completed",
        stars: 45
    }
];

export default function ProjectsSection() {
    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);

    return (
        <section id="projects" className="py-20 bg-gradient-to-b from-black to-purple-950/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">Featured Projects</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A showcase of my latest work and creative solutions
                    </p>
                </motion.div>

                {/* Featured Projects */}
                <div className="mb-16">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-purple-300 mb-8 flex items-center"
                    >
                        <Star className="w-6 h-6 mr-2 fill-purple-400 text-purple-400" />
                        Highlighted Work
                    </motion.h3>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group"
                            >
                                <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 overflow-hidden h-full">
                                    {/* Project Image */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600/20 to-purple-800/20">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-700/10 flex items-center justify-center">
                                            <div className="text-6xl opacity-20">💻</div>
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                                                asChild
                                            >
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                                                asChild
                                            >
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    Code
                                                </a>
                                            </Button>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4">
                                            <Badge
                                                className={
                                                    project.status === "Completed"
                                                        ? "bg-green-600/80 text-white border-0"
                                                        : "bg-yellow-600/80 text-white border-0"
                                                }
                                            >
                                                {project.status}
                                            </Badge>
                                        </div>

                                        {/* Stars */}
                                        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/60 px-2 py-1 rounded">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-white text-sm">{project.stars}</span>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                            {project.title}
                                        </h4>
                                        <p className="text-gray-300 mb-4 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="bg-purple-600/20 text-purple-200 border-purple-500/30 hover:bg-purple-600/30 transition-colors"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex space-x-3">
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                                asChild
                                            >
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    View Project
                                                </a>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                                                asChild
                                            >
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Other Projects */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-purple-300 mb-8"
                    >
                        Other Projects
                    </motion.h3>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {otherProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <Card className="bg-gradient-to-br from-purple-900/10 to-black border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-bold text-white">{project.title}</h4>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-gray-400 text-sm">{project.stars}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="text-xs bg-purple-600/20 text-purple-200 border-purple-500/30"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs bg-gray-600/20 text-gray-300 border-gray-500/30"
                                                >
                                                    +{project.technologies.length - 3}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white text-xs"
                                                asChild
                                            >
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-3 h-3 mr-1" />
                                                    Demo
                                                </a>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-purple-500/50 text-purple-300 hover:bg-purple-600 hover:text-white"
                                                asChild
                                            >
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-3 h-3" />
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Card className="bg-gradient-to-r from-purple-900/20 via-black to-purple-900/20 border-purple-500/30">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Interested in collaborating?
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                I'm always open to discussing new opportunities, creative projects,
                                or just having a chat about technology and development.
                            </p>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                onClick={() => {
                                    const contactSection = document.querySelector("#contact");
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                            >
                                Get In Touch
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
