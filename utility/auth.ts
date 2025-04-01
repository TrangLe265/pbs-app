import { useState } from 'react';
import supabase from './supabaseClient';

export function useAuth(){
    const [message, setMessage] = useState(''); 

    // Handle user sign-up
    const handleSignUp = async (email: string, password: string, name: string) => {
        if (!email.trim() || !password.trim() || !name.trim()) {
            setMessage("Please enter a valid email, password, and name.");
            return;
        }
    
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setMessage(`Sign-up failed: ${error.message}`);
            } else if (data.session) {
            
                setMessage("Sign-up successful! Redirecting...");
                
                // Add the user's name to the "users" table
                if (data.user) {
                    const { error: userError } = await supabase.from("users").insert([
                        { id: data.user.id, name },
                    ]);
                    if (userError) {
                        console.error("Error inserting user: ", userError.message);
                    }
                }
            }
        } catch (error: any) {
            setMessage(error?.message || "An unexpected error occurred during sign-up.");
        }
    };


 // Handle user sign-in
    const handleSignIn = async (email: string, password: string) => {
        if (!email.trim() || !password.trim()) {
            setMessage("Please enter a valid email and password.");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setMessage(`Sign-in failed: ${error.message}`);
            } else if (data.session) {

                setMessage("Sign-in successful! Redirecting...");
                // Add navigation logic here if needed, e.g., router.push('/home');
            }
        } catch (error: any) {
            setMessage(error?.message || "An unexpected error occurred during sign-in.");
        }
    };
        return {handleSignUp, handleSignIn, message}
    
}

