// src/components/home/Stats.tsx
const statsData = [
    { number: "500+", label: "Enterprise Clients" },
    { number: "50K+", label: "Cameras Managed" },
    { number: "99.9%", label: "Uptime" },
    { number: "1B+", label: "Events Processed" },
];

const Stats = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;