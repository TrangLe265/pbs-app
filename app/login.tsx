import React, { useState } from "react";
import { Button, Input, Paragraph } from "tamagui";
import { Container, LineSeperator, SubTitle, Title } from "@/tamagui.config";
import { Alert } from "react-native";
import supabase from "@/utility/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LoginScreen() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState(""); 
    const [message, setMessage] = useState(""); 

    // Handle user sign-up
    const handleSignUp = async (email: string, password: string, name: string) => {
        if (!email.trim() || !password.trim() || !name.trim()) {
            setMessage("Please enter a valid email, password, and name.");
            return;
        }

        {/*(await supabase.auth.getSession()).data.session?.access_token*/}

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setMessage(`Sign-up failed: ${error.message}`);
            } else if (data.session) {
                // Store the token in AsyncStorage
                //const token = data.session.access_token;
                //await AsyncStorage.setItem("authToken", token);

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

                // Add navigation logic here if needed, e.g., router.push('/home');
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
                // Store the token in AsyncStorage
                //const token = data.session.access_token;
                //await AsyncStorage.setItem("authToken", token);

                setMessage("Sign-in successful! Redirecting...");
                // Add navigation logic here if needed, e.g., router.push('/home');
            }
        } catch (error: any) {
            setMessage(error?.message || "An unexpected error occurred during sign-in.");
        }
    };
 
    return (
        <Container>
            <Title>Welcome to My PRs</Title>
            <LineSeperator />
            <SubTitle color={"$blue3Dark"}>To start using the app, log in</SubTitle>

            <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoFocus={true}
                flexGrow={1}
                height={50}
                size="$4"
                borderWidth={2}
                width={200}
                marginBottom={15}
            />
            
            <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} 
                flexGrow={1}
                height={50}
                size="$4"
                borderWidth={2}
                width={200}
            />

            <Button onPress={() => handleSignIn(email, password)} marginTop={10}>
                <Paragraph>Sign In</Paragraph>
            </Button>
            <LineSeperator />
            <SubTitle color={"$blue3Dark"}>Don't have an account? Sign up</SubTitle>
            <Input
                placeholder="Just any nickname"
                value={name}
                onChangeText={setName}
                flexGrow={1}
                height={50}
                size="$4"
                borderWidth={2}
                width={200}
            />

            <Button onPress={() => handleSignUp(email, password, name)} marginTop={10}>
                <Paragraph>Sign Up</Paragraph>
            </Button>

            <SubTitle fontSize={"$5"} marginTop={15} color={"$red8Light"}>{message}</SubTitle>
        </Container>
    );
}
