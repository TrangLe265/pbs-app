import { Container, LineSeperator, Title } from "@/tamagui.config"
import React from "react"
import { Text } from "react-native"
import { Button, Input, Square } from "tamagui"
import { LogoIcon } from '@tamagui/logo'


export default function loginScreen(){
    return (
        <>
            <Container>
                <Title>Welcome to My PRs</Title>
                

            <Input flexGrow={1} height={50} size="$4" borderWidth={2} width={200} placeholder="Enter your email"/>
                
                <Input flexGrow={1} height={50} size="$4" borderWidth={2} width={200} placeholder="Enter your password"/>
                <LineSeperator/>
                <Button>Log in</Button>


            </Container>
        </>
    )
}
