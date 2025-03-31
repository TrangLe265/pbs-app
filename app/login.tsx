import React, { useState } from "react";
import { Button, Input, Paragraph } from "tamagui";
import { Container, LineSeperator, SubTitle, Title } from "@/tamagui.config";
import supabase from "@/utility/supabaseClient";
import { Alert } from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState(""); 

    // Handle user sign-up
    const handleSignUp = async (email: string, password: string, name: string) => {
        if (!email.trim() || !password.trim() || !name.trim()) {
            Alert.alert("Error", "Please enter a valid email, password, and name.");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                Alert.alert("Sign-Up Failed", error.message);
            } else {
                Alert.alert(
                    "Sign-Up Successful",
                    "Please check your email to confirm your account."
                );
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
            Alert.alert("Error", error?.message || "An unexpected error occurred during sign-up.");
        }
    };

    // Handle user sign-in
    const handleSignIn = async (email: string, password: string) => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Please enter a valid email and password.");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                Alert.alert("Sign-In Failed", error.message);
            } else {
                Alert.alert("Sign-In Successful", "Redirecting...");
                // Add navigation logic here if needed, e.g., router.push('/home');
            }
        } catch (error: any) {
            Alert.alert("Error", error?.message || "An unexpected error occurred during sign-in.");
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
        </Container>
    );
}
