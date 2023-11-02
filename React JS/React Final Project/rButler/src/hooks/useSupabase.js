import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

const useSupabase = () => {
    const [supabase, setSupabase] = useState(null);

    useEffect(() => {
        if (!supabaseInstance) {
            const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
            const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
            supabaseInstance = createClient(SUPABASE_URL, SUPABASE_API_KEY);
        }
        setSupabase(supabaseInstance);
    }, []);

    const uploadAvatar = async (file) => {
        try {
            if (!supabaseInstance) {
                throw new Error('Supabase client not initialized');
            }

            const { data, error } = await supabaseInstance.storage.from('avatars').upload(`/${Date.now()}_${file.name}`, file, {
                cacheControl: '3600',
                upsert: false,
            });

            if (error) {
                throw new Error(error.message);
            }

            const avatarURL = `${import.meta.env.VITE_SUPABASE_URL}${import.meta.env.VITE_SUPABASE_BUCKET}${data.path}`;
            return avatarURL;
        } catch (error) {
            console.log(error);
        }
    };

    return { supabase, uploadAvatar };
};

export default useSupabase;
