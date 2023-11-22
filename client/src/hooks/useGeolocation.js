import { useState, useEffect } from 'react';

export const useGeolocation = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setError(error.message);
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);

    return { position, error };
};
