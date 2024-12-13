const PowerfulAnalytics = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    {/* Left side content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold mb-6">
                            Powerful Analytics Platform
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Get real-time insights with our intuitive dashboard. Monitor multiple locations,
                            track key metrics, and make data-driven decisions.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Real-time monitoring and alerts",
                                "Custom reporting and analytics",
                                "Mobile access and notifications"
                            ].map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right side image/placeholder */}
                    <div className="lg:w-1/2">
                        <div className="bg-gray-200 rounded-lg h-[400px] w-full flex items-center justify-center">
                            {/* Add your analytics dashboard preview */}
                            <span className="text-gray-500">Analytics Dashboard Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PowerfulAnalytics;