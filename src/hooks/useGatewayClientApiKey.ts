// hooks/useGatewayClientApiKey.ts
import { useEffect, useState } from 'react';

export const useGatewayClientApiKey = () => {
    const [apiKey, setApiKey] = useState<string>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
              
        const fetchApiKey = async () => {
           
            try {
               
                setApiKey(process.env.NEXT_PUBLIC_VISIONTRACK_API_KEY);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            }
        };

        fetchApiKey();
    }, []);

    return { apiKey, error };
};