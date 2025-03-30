import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { H4, XStack, Button, Paragraph, H3, Separator, ScrollView, Circle } from "tamagui";
import { Card } from "tamagui";
import { Container, LineSeperator, SubTitle, Title } from "@/tamagui.config";

export default function IndexScreen() {
    const router = useRouter();
    const categories = ["squat", "bench", "deadlift"];

    return (
        <>
        <Link href="/(modals)/login" >Login test</Link>
        <Container>
            <Title>Find all your PRs here </Title>
            <LineSeperator/>
            <ScrollView maxHeight={600}
                                width="95%"
                                padding="$4"
                                borderRadius="$4">
            {categories.map((category) => (
                <Card size="$5" width={300} style={{ marginBottom: 20 }} key={category}>
                    <Card.Header padded>
                        <H4>{category.toUpperCase()}</H4>
                        <Paragraph theme="alt2">Current PR</Paragraph>
                    </Card.Header>

                    <Card.Footer padded>
                        <XStack flex={1} />
                        <Button
                            animation="bouncy"
                            elevation="$4"
                            hoverStyle={{
                                scale: 2.0,
                            }}
                            pressStyle={{
                                scale: 2.0,
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
