import { useState, useCallback } from 'react';

export const useLoading = (initialState) => {
    const [isLoading, setIsLoading] = useState(initialState);

    const handleLoading = useCallback(async (callBack) => {
        setIsLoading(true);
        try {
            const result = await callBack();
            return result;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return [isLoading, handleLoading];
};
