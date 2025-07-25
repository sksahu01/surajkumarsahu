"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    MessageSquare,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react";

// Form validation schema
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "surajkumarsahu01@gmail.com",
        href: "mailto:surajkumarsahu01@gmail.com",
        description: "Drop me a line anytime"
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+91 98765 43210",
        href: "tel:+919876543210",
        description: "Let's have a conversation"
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Rourkela, India",
        href: "https://maps.google.com/?q=Rourkela,India",
        description: "Available for remote work"
    },
    {
        icon: Clock,
        label: "Response Time",
        value: "Within 24 hours",
        href: null,
        description: "I'll get back to you soon"
    }
];

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/surajkumarsahu01",
        color: "hover:text-gray-400",
        description: "Check out my code"
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://linkedin.com/in/suraj-kumar-sahu",
        color: "hover:text-blue-400",
        description: "Connect professionally"
    },
    {
        name: "Twitter",
        icon: Twitter,
        href: "https://twitter.com/surajkumarsahu01",
        color: "hover:text-sky-400",
        description: "Follow my thoughts"
    },
    {
        name: "Instagram",
        icon: Instagram,
        href: "https://instagram.com/surajkumarsahu01",
        color: "hover:text-pink-400",
        description: "See my journey"
    }
];

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real implementation, you would send the data to your backend
            console.log('Form submitted:', data);

            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-black to-purple-950/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gradient mb-4">Get In Touch</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Ready to bring your ideas to life? Let&apos;s start a conversation about your next project.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
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
                                        <MessageSquare className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                                        <p className="text-gray-400">I&apos;d love to hear from you</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-300">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            {...register("name")}
                                            placeholder="Your full name"
                                            className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                                        />
                                        {errors.name && (
                                            <p className="text-red-400 text-sm flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-300">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            placeholder="your.email@example.com"
                                            className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-sm flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Subject Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-gray-300">
                                            Subject *
                                        </Label>
                                        <Input
                                            id="subject"
                                            {...register("subject")}
                                            placeholder="What would you like to discuss?"
                                            className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-400 text-sm flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.subject.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-gray-300">
                                            Message *
                                        </Label>
                                        <Textarea
                                            id="message"
                                            {...register("message")}
                                            placeholder="Tell me about your project, ideas, or just say hello!"
                                            rows={5}
                                            className="bg-black/50 border-purple-500/30 text-white placeholder:text-gray-500 focus:border-purple-500 resize-none"
                                        />
                                        {errors.message && (
                                            <p className="text-red-400 text-sm flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>

                                    {/* Status Messages */}
                                    {submitStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center space-x-2 text-green-400 bg-green-600/10 p-3 rounded-lg border border-green-500/20"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                                        </motion.div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center space-x-2 text-red-400 bg-red-600/10 p-3 rounded-lg border border-red-500/20"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            <span>Failed to send message. Please try again or contact me directly.</span>
                                        </motion.div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Information & Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Contact Info */}
                        <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                            <CardHeader>
                                <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                                <p className="text-gray-400">Feel free to reach out through any of these channels</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        {info.href ? (
                                            <a
                                                href={info.href}
                                                target={info.href.startsWith('http') ? '_blank' : undefined}
                                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all group-hover:bg-purple-600/20"
                                            >
                                                <div className="p-2 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                                                    <info.icon className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                        {info.label}
                                                    </h4>
                                                    <p className="text-purple-300 font-medium">{info.value}</p>
                                                    <p className="text-gray-400 text-sm">{info.description}</p>
                                                </div>
                                            </a>
                                        ) : (
                                            <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/20">
                                                <div className="p-2 bg-purple-600/20 rounded-lg">
                                                    <info.icon className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white">{info.label}</h4>
                                                    <p className="text-purple-300 font-medium">{info.value}</p>
                                                    <p className="text-gray-400 text-sm">{info.description}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                            <CardHeader>
                                <h3 className="text-2xl font-bold text-white">Connect With Me</h3>
                                <p className="text-gray-400">Follow my journey on social platforms</p>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05 }}
                                            className="group p-4 rounded-lg bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all text-center"
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="p-3 bg-purple-600/20 rounded-full group-hover:bg-purple-600/30 transition-colors">
                                                    <social.icon className={`w-6 h-6 text-gray-400 transition-colors ${social.color}`} />
                                                </div>
                                                <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                    {social.name}
                                                </h4>
                                                <p className="text-gray-400 text-sm">{social.description}</p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Availability Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-r from-green-900/20 via-black to-green-900/20 border-green-500/30">
                                <CardContent className="p-6 text-center">
                                    <div className="flex items-center justify-center space-x-2 mb-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                                            Available for Work
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        Open to New Opportunities
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        I&apos;m currently available for freelance projects and full-time positions.
                                        Let&apos;s discuss how we can work together!
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
