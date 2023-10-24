import { useState } from 'react';

export const useLoading = (initialState = true) => {
    const [isLoading, setIsLoading] = useState(initialState);

    const handleLoading = async (callBack) => {
        setIsLoading(true);
        try {
            const result = await callBack();
            return result;
        } finally {
            setIsLoading(false);
        }
    };

    return [isLoading, handleLoading];
};
