import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseUpload } from '../services/supabaseService.js';

let supabaseInstance = null;

const useSupabase = () => {
    useEffect(() => {
        if (!supabaseInstance) {
            const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
            const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
            supabaseInstance = createClient(SUPABASE_URL, SUPABASE_API_KEY);
        }
    }, []);

    const uploadAvatar = async (file) => {
        try {
            if (!supabaseInstance) {
                throw new Error('Supabase client not initialized');
            }

            const { data, error } = await supabaseUpload(supabaseInstance, file);

            if (error) {
                throw new Error(error.message);
            }

            const avatarURL = `${import.meta.env.VITE_SUPABASE_URL}${import.meta.env.VITE_SUPABASE_BUCKET}${data.path}`;
            return avatarURL;
        } catch (error) {
            throw error;
        }
    };

    return { uploadAvatar };
};

export default useSupabase;
