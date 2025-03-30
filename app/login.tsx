import React, { useState } from "react";
import { Button, Input, Form, Paragraph } from "tamagui";
import { Container, LineSeperator, SubTitle, Title } from "@/tamagui.config";
import { signInWithMagicLink } from "@/utility/auth";

export default function LoginScreen() {
    const [ email, setEmail] = useState(''); 
    const [message, setMessage] = useState(''); 

    const handleLogIn= async(event: React.FormEvent) => {
        if (!email.trim()){
            setMessage("Please enter a valid email."); 
            return; 
        }

        console.log("Attempt logging in with: ", email)
        try {
            await signInWithMagicLink(email); 
            console.log("trying to connect")
            setMessage('Please confirm with your email!')
        } catch (error){
            if (error instanceof Error) {
                setMessage(error.message); 
            } else {
                setMessage('An unknown error occurred.');
            }
        };
    }

    return (
        <Container>
            <Title>Welcome to My PRs</Title>
            
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
                />
                <LineSeperator />
                <Button onPress={() => handleLogIn()}>
                    <Paragraph>Continue</Paragraph>
                </Button>
                <Paragraph>{message}</Paragraph>
        </Container>
    );
}
