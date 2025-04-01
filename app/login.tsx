import React, { useState } from "react";
import { Button, Input, Paragraph } from "tamagui";
import { Container, LineSeperator, SubTitle, Title } from "@/tamagui.config";
import supabase from "@/utility/supabaseClient";
import { useAuth } from "@/utility/auth";

//this file is for login/signup UI
const AuthInput: React.FC<{ 
    placeholder: string; 
    value: string; 
    onChangeText: (text: string) => void; 
    secureTextEntry?: boolean; 
}> = ({placeholder, value, onChangeText, secureTextEntry = false}) => {
    return (
        <Input 
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            flexGrow={1}
            height={50}
            size="$4"
            borderWidth={2}
            width={200}
            marginBottom={15}
            secureTextEntry={secureTextEntry}
        />
    );
}

export default function LoginScreen() {
    const {handleSignIn, handleSignUp, message } = useAuth(); 
    const [form, setForm] = useState({email: "", password: "", name: ""}); 

    const handleChange =(key: keyof typeof form, value: string) => {
        setForm(prev => ({...prev, [key]: value}))
    }

 
    return (
        <Container>
            <Title>Welcome to My PRs</Title>
            <LineSeperator />
            <SubTitle color={"$blue3Dark"}>To start using the app, log in</SubTitle>

            <AuthInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(value) => handleChange("email",value)}
            />
            
            <AuthInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry={true}
            />

            <Button onPress={() => handleSignIn(form.email, form.password)} marginTop={10}>
                <Paragraph>Sign In</Paragraph>
            </Button>
            <LineSeperator />
            <SubTitle color={"$blue3Dark"}>Don't have an account? Sign up</SubTitle>
            <AuthInput
                placeholder="Just any nickname"
                value={form.name}
                onChangeText={(value) => handleChange("name",value)}
            />

            <Button onPress={() => handleSignUp(form.email, form.password, form.name)} marginTop={10}>
                <Paragraph>Sign Up</Paragraph>
            </Button>

            <SubTitle fontSize={"$5"} marginTop={15} color={"$red8Light"}>{message}</SubTitle>
        </Container>
    );
}
