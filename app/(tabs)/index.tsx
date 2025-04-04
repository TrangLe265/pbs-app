import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { H4, XStack, Button, Paragraph, H3, Separator, ScrollView, Circle } from "tamagui";
import { Card } from "tamagui";
import { Container, LineSeperator, SubTitle, Title } from "@/tamagui.config";

//This file hosts all the Modals(suat, bench, deadlift)
export default function IndexScreen() {
    const router = useRouter();
    const categories = ["squat", "bench", "deadlift"];

    return (
        <>
        <Container>
            <Title>Find all your PRs here </Title>
            <LineSeperator/>
            <ScrollView maxHeight={650}
                                width="95%"
                                padding="$4"
                                borderRadius="$4">
            {categories.map((category) => (
                <Card size="$4" width={300} style={{ marginBottom: 20 }} key={category}>
                    <Card.Header padded>
                        <H4>{category.toUpperCase()}</H4>
                        <Paragraph theme="alt2">Current PR</Paragraph>
                    </Card.Header>

                    <Card.Footer padded>
                        <XStack flex={1} />
                        
                        <Button
                            backgroundColor={'$blue10'}
                            animation="bouncy"
                            elevation="$4"
                            hoverStyle={{
                                scale: 1.5,
                            }}
                            pressStyle={{
                                scale: 1.5,
                            }}
                            onPress={() => router.push(`/(modals)/${category}`)}
                            borderRadius="$10"
                        >
                            View all   
                        </Button>
                        
                    </Card.Footer>
                </Card>
            ))}
             </ScrollView>
        </Container>

       </>
    );    
}
