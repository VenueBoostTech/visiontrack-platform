// src/components/home/Hero.tsx
import { Play } from 'lucide-react'; // Import play icon
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#1E3A8A] min-h-[80vh] flex items-center pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Transform Video into Business Intelligence
                    </h1>
                    <p className="text-lg text-gray-300 mb-12">
                        The enterprise video intelligence platform that turns surveillance into actionable insights
                        for Commercial Real Estate, Manufacturing, Multi-family Residential, and Retail operations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        <Link href="/request-demo">
                            <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                                Get Started
                            </button>
                        </Link>
                        <button className="border-2 border-[#4F46E5] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4F46E5]/10 transition-colors flex items-center gap-2">
                            <Play size={20} className="fill-white" /> Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-8 text-center">
                        <div>
                            <div className="text-white text-4xl font-bold mb-2">500+</div>
                            <div className="text-gray-400 text-sm">Enterprise Clients</div>
                        </div>
                        <div>
                            <div className="text-white text-4xl font-bold mb-2">50K+</div>
                            <div className="text-gray-400 text-sm">Cameras Managed</div>
                        </div>
                        <div>
                            <div className="text-white text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-gray-400 text-sm">Uptime</div>
                        </div>
                        <div>
                            <div className="text-white text-4xl font-bold mb-2">1B+</div>
                            <div className="text-gray-400 text-sm">Events Processed</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;