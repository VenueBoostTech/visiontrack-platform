// src/components/home/CallToAction.tsx
const CallToAction = () => {
    return (
        <section className="bg-[#1e3a8a] py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Operations?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join industry leaders who trust VisionTrack to deliver actionable intelligence
                        and drive operational excellence.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Schedule Demo
                        </button>
                        <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;