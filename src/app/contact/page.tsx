"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
                            <p className="text-muted-foreground">
                                Have a custom design in mind? Or need help with an order? Reach out to us.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Email Us</h3>
                                    <p className="text-sm text-muted-foreground">CustomizeYourOwn@hotmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Call / WhatsApp</h3>
                                    <p className="text-sm text-muted-foreground">0784770089</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button className="w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-700">
                                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                            </Button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-muted/30 p-8 rounded-lg border">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" type="email" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea
                                    id="message"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us about your custom idea..."
                                />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
