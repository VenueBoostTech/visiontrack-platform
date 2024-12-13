// src/components/RequestDemo/index.tsx
"use client";
import { useState } from "react";
import { Check, Building2, Camera, Users } from "lucide-react";

const RequestDemoForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        jobTitle: "",
        phoneNumber: "",
        numberOfCameras: "",
        numberOfProperties: "",
        industry: "",
        useCase: "",
        currentSystem: "",
        requirements: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Thank You for Your Interest!</h2>
                <p className="text-gray-600 text-center max-w-md mb-8">
                    We'll prepare a customized demo of VisionTrack focusing on your specific needs. Our team will contact you within 24 hours to schedule your personalized demo.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-[#4338CA] transition-colors"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Experience VisionTrack in Action</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        See how our AI-powered video intelligence platform can transform your surveillance system into a powerful business intelligence tool. Get a personalized demo tailored to your industry needs.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
                    {/* Contact Information */}
                    <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium mb-2">First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Work Email *</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                    </div>

                    {/* Business Information */}
                    <h3 className="text-xl font-semibold mb-6">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium mb-2">Company Name *</label>
                            <input
                                type="text"
                                name="company"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Industry *</label>
                            <select
                                name="industry"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            >
                                <option value="">Select Industry</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="residential">Multi-family Residential</option>
                                <option value="commercial">Commercial Real Estate</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Properties *</label>
                            <input
                                type="number"
                                name="numberOfProperties"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Number of Cameras *</label>
                            <input
                                type="number"
                                name="numberOfCameras"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>
                    </div>

                    {/* Requirements */}
                    <h3 className="text-xl font-semibold mb-6">Requirements</h3>
                    <div className="mb-8">
                        <label className="block text-sm font-medium mb-2">What are your primary requirements? *</label>
                        <textarea
                            name="requirements"
                            rows={4}
                            placeholder="Please describe your current challenges and what you're looking to achieve with video intelligence..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                        ></textarea>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full bg-[#4F46E5] text-white py-3 rounded-lg font-semibold hover:bg-[#4338CA] transition-colors"
                        >
                            Request Demo
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RequestDemoForm;