import supabase from './supabaseClient';

//Signing in with MagicLink

export const signInWithMagicLink = async(email: string) => {
    
    const { error } = await supabase.auth.signInWithOtp({email}); //Magic Link is sent 
    if (error) {
        console.error("MagicLink error: " + error.message); 
        throw error; 
    }; 
}

/*
export const checkSession = async() => {
    const {data: {session},} = await supabase.auth.getSession(); //supabase.auth.getSession: a function by SB lib, which fetches the session data 
    console.log(session); 
    return session; 
}*/
