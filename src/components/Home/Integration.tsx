// src/components/Home/Integration.tsx
import { Zap } from 'lucide-react';

const Integration = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="text-primary mb-6 flex justify-center">
                        <Zap size={48} />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">
                        Easy Integration
                    </h2>
                    <p className="text-xl text-gray-600">
                        Seamless integration with existing systems
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Integration;