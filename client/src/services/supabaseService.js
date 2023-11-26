export const supabaseUpload = async (supabaseInstance, file) =>
    await supabaseInstance.storage.from('avatars').upload(`/${Date.now()}_${file.name}`, file, {
        cacheControl: '3600',
        upsert: false,
    });
