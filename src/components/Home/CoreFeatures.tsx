// src/components/home/CoreFeatures.tsx
import { Shield, Brain, Activity, Zap } from 'lucide-react';

const features = [
    {
        icon: <Shield className="w-8 h-8 text-primary" />,
        title: "Advanced Security",
        description: "Enterprise-grade security with end-to-end encryption"
    },
    {
        icon: <Brain className="w-8 h-8 text-primary" />,
        title: "AI-Powered Analytics",
        description: "Deep learning algorithms for actionable insights"
    },
    {
        icon: <Activity className="w-8 h-8 text-primary" />,
        title: "Real-time Analytics",
        description: "Instant insights and alerts for quick action"
    },
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: "Easy Integration",
        description: "Seamless integration with existing systems"
    }
];

const CoreFeatures = () => {
    return (
        <section className="bg-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreFeatures;