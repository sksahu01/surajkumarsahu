"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RESUME_LINKS } from "@/lib/constants";
import {
    Download,
    Eye,
    Briefcase,
    GraduationCap,
    Award,
    Code,
    Calendar,
    MapPin,
    ExternalLink
} from "lucide-react";

const experiences = [
    {
        id: 1,
        title: "Mobile Application Developer",
        company: "Psynux Software Private Limited",
        location: "Bhubaneswar, India",
        period: "Jun 2025 - Present",
        description: "Independently developing a mobile app for a premium EV ride-hailing service using Flutter (Dart) and Node.js (Express.js), focusing on scalable architecture, real-time ride management, authentication, location-based services, and seamless user experience.",
        technologies: ["Flutter", "Dart", "Node.js", "Express.js", "MongoDB", "TypeScript", "Figma"],
        type: "Internship"
    },
    {
        id: 2,
        title: "Project Management",
        company: "Evotto Private Limited",
        location: "Bhubaneswar, India",
        period: "Jan 2025 - Mar 2025",
        description: "Worked on developing an eCommerce platform for vehicle rentals, contributing to research, planning, and execution while coordinating with cross-functional teams, analyzing data, managing resources, and ensuring timely, high-quality project delivery. Led a team of 9 developers, implementing Agile methodologies to enhance productivity and collaboration.",
        technologies: ["React.js", "JavaScript", "MongoDB", "Node.js", "Express.js", "Figma"],
        type: "Internship"
    }
];

const education = [
    {
        id: 1,
        degree: "Bachelor of Technology",
        field: "Computer Science & Engineering",
        institution: "Institute of Technical Education & Research",
        location: "Bhubaneswar, India",
        period: "2022 - 2026",
        grade: "9.24 CGPA",
        achievements: ["CTO (Campus Technology Officer) CNXITER", "Tech lead GDG ITER", "(JUO) Junior Under Officer at SOA NCC", "WINNER🏆10X Ideathons", "Winner🏆8X Hackathons"]
    },
    {
        id: 2,
        degree: "Higher Secondary",
        field: "Science (PCM)",
        institution: "Kendriya Vidyalaya , Gopalpur Military Station",
        location: "Brahmapur, India",
        period: "2020 - 2022",
        grade: "85.16%",
        achievements: ["3rd prize in short film competition", "3rd Topper of Batch of 2022", "NCC A Certificate Holder", "Silver medal in National Level Taekwondo Poomsae "]
    }
];

const certifications = [
    {
        id: 1,
        name: "SAP Activate - Implementation Tools and Methodology",
        issuer: "SAP",
        date: "2025",
        credentialId: "P2010162007",
        icon: "🏆"
    },
    {
        id: 2,
        name: "Managing Clean Core for SAP S/4HANA Cloud ",
        issuer: "SAP",
        date: "2025",
        credentialId: "a2ec5522-b5de-4b76-a3fd-c1dde683c4c7",
        icon: "⚛️"
    },
    {
        id: 3,
        name: "Introducing the Aerospace & Defense Industry",
        issuer: "SAP",
        date: "2025",
        credentialId: "NA",
        icon: "📜"
    },
    {
        id: 4,
        name: "Google Cloud Study Jam",
        issuer: "Google Cloud Platform",
        date: "2024",
        credentialId: "NA",
        icon: "☁️"
    }
];

export default function ResumeSection() {
    const handleDownloadResume = async () => {
        try {
            // Create a temporary link element to trigger download
            const link = document.createElement('a');
            link.href = RESUME_LINKS.download;
            link.download = RESUME_LINKS.fileName;
            link.target = '_blank';

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
            // Fallback: open in new tab
            window.open(RESUME_LINKS.viewOnline, '_blank');
        }
    };

    const handleViewResume = () => {
        window.open(RESUME_LINKS.viewOnline, '_blank');
    };

    return (
        <section id="resume" className="py-20 bg-gradient-to-b from-purple-950/10 to-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">Resume</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        My professional journey, education, and achievements
                    </p>

                    {/* Download Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={handleDownloadResume}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download Resume
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleViewResume}
                            className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                        >
                            <Eye className="w-5 h-5 mr-2" />
                            View Online
                        </Button>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Experience */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-600/20 rounded-lg">
                                            <Briefcase className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Experience</h3>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {experiences.map((exp, index) => (
                                        <motion.div
                                            key={exp.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="relative"
                                        >
                                            {/* Timeline Line */}
                                            {index < experiences.length - 1 && (
                                                <div className="absolute left-0 top-8 w-px h-20 bg-gradient-to-b from-purple-500 to-transparent"></div>
                                            )}

                                            {/* Timeline Dot */}
                                            <div className="absolute left-0 top-2 w-2 h-2 bg-purple-500 rounded-full"></div>

                                            <div className="ml-6">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                    <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-purple-600/20 text-purple-200 border-purple-500/30 w-fit"
                                                    >
                                                        {exp.type}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center text-purple-300 mb-2 space-x-4">
                                                    <span className="font-semibold">{exp.company}</span>
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="text-sm">{exp.location}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center text-gray-400 mb-3">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">{exp.period}</span>
                                                </div>

                                                <p className="text-gray-300 text-sm mb-3">{exp.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {exp.technologies.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="bg-gray-700/30 text-gray-300 border-gray-600/30 text-xs"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {index < experiences.length - 1 && (
                                                <Separator className="mt-6 bg-gray-700/30" />
                                            )}
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-600/20 rounded-lg">
                                            <Award className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Certifications</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {certifications.map((cert, index) => (
                                            <motion.div
                                                key={cert.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                whileHover={{ scale: 1.02 }}
                                                className="p-4 bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all cursor-pointer"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-2xl">{cert.icon}</span>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-white text-sm mb-1">{cert.name}</h4>
                                                        <p className="text-purple-300 text-sm mb-1">{cert.issuer}</p>
                                                        <p className="text-gray-400 text-xs mb-2">{cert.date}</p>
                                                        <p className="text-gray-500 text-xs">ID: {cert.credentialId}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Education */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-600/20 rounded-lg">
                                            <GraduationCap className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Education</h3>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {education.map((edu, index) => (
                                        <motion.div
                                            key={edu.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="relative"
                                        >
                                            {/* Timeline Line */}
                                            {index < education.length - 1 && (
                                                <div className="absolute left-0 top-8 w-px h-20 bg-gradient-to-b from-purple-500 to-transparent"></div>
                                            )}

                                            {/* Timeline Dot */}
                                            <div className="absolute left-0 top-2 w-2 h-2 bg-purple-500 rounded-full"></div>

                                            <div className="ml-6">
                                                <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                                                <p className="text-purple-300 font-semibold mb-2">{edu.field}</p>

                                                <div className="flex items-center text-gray-400 mb-2 space-x-4">
                                                    <span>{edu.institution}</span>
                                                    <div className="flex items-center space-x-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="text-sm">{edu.location}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center text-gray-400">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">{edu.period}</span>
                                                    </div>
                                                    <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                                                        {edu.grade}
                                                    </Badge>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {edu.achievements.map((achievement) => (
                                                        <Badge
                                                            key={achievement}
                                                            variant="secondary"
                                                            className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30 text-xs"
                                                        >
                                                            {achievement}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {index < education.length - 1 && (
                                                <Separator className="mt-6 bg-gray-700/30" />
                                            )}
                                        </motion.div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Skills Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-600/20 rounded-lg">
                                            <Code className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-purple-300 font-semibold mb-2">Frontend</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {["Flutter", "JavaScript", "HTML", "CSS", "React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"].map((skill) => (
                                                    <Badge key={skill} className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-purple-300 font-semibold mb-2">Backend</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {["Node.js", "Express.js", "Python", "MongoDB", "Firebase", "Flutter"].map((skill) => (
                                                    <Badge key={skill} className="bg-green-600/20 text-green-300 border-green-500/30">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-purple-300 font-semibold mb-2">Tools & Platforms</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {["AWS", "Docker", "Git", "Github", "Figma", "VS Code", "Jira", "Postman", "Kubernetes", "Terraform", "Jenkins"].map((skill) => (
                                                    <Badge key={skill} className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
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
                                Ready to work together?
                            </h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                I&apos;m always looking for new opportunities to create amazing digital experiences
                                and solve complex problems with cutting-edge technology.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    onClick={handleDownloadResume}
                                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Get My Resume
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
                                    onClick={() => {
                                        const contactSection = document.querySelector("#contact");
                                        if (contactSection) {
                                            contactSection.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                >
                                    <ExternalLink className="w-5 h-5 mr-2" />
                                    Let&apos;s Connect
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
