// src/components/home/IndustrySpecific.tsx
import { Store, Factory, Building2, ShoppingBag } from 'lucide-react';
import Image from "next/image";
import SectionHeader from "@/components/Common/SectionHeader";

const industries = [
    {
        icon: <ShoppingBag className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
        title: "Retail",
        description: "Optimize operations and enhance customer experience",
        features: [
            "Customer Analytics",
            "Loss Prevention",
            "Queue Management"
        ]
    },
    {
        icon: <Factory className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
        title: "Manufacturing",
        description: "Ensure safety and optimize operations efficiency",
        features: [
            "Safety Compliance",
            "Process Monitoring",
            "Quality Control"
        ]
    },
    {
        icon: <Building2 className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
        title: "Multi-family Residential",
        description: "Enhance security and resident services",
        features: [
            "Access Control",
            "Package Management",
            "Community Safety"
        ]
    }
];

const IndustrySpecific = () => {
    return (
        <section className="relative z-1 overflow-hidden bg-gray-1 py-17.5 dark:bg-black dark:text-white lg:py-17.5 xl:py-17.5">
            {/* Section Header */}
            <SectionHeader
                title="Industry-Specific Solutions"
                description="Tailored video intelligence for your unique needs"
            />

            <div className="relative z-1 mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
                <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="wow fadeInUp cursor-pointer group relative rounded-lg bg-white p-8 shadow-features dark:bg-dark"
                            data-wow-delay={`.${index + 1}s`}
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/[.08] text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                                {industry.icon}
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                                {industry.title}
                            </h3>
                            <p className="mb-8 text-base leading-relaxed text-body dark:text-body-dark">
                                {industry.description}
                            </p>
                            <ul className="space-y-3">
                                {industry.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center text-body dark:text-body-dark">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Background Shapes */}
                <div className="hidden sm:block">
                    <div className="absolute left-0 top-1/2 -z-1 -translate-y-1/2">
                        <Image
                            src="/images/features/features-shape-01.svg"
                            alt="shape"
                            width={600}
                            height={600}
                        />
                    </div>
                    <div className="absolute right-0 top-1/2 -z-1 -translate-y-1/2">
                        <Image
                            src="/images/features/features-shape-02.svg"
                            alt="shape"
                            width={800}
                            height={800}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustrySpecific;