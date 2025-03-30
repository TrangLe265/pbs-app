import { useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { H4, XStack, Button, Paragraph, H3, Separator } from "tamagui";
import { Card } from "tamagui";
import Colors from "@/constants/Colors";

export default function IndexScreen() {
    const router = useRouter();
    const categories = ["squat", "bench", "deadlift"];

    return (
        <View style={styles.container}>
            <H3>All your personal bests in one place!</H3>

            {categories.map((category) => (
                <Card size="$5" width={300} style={{ marginBottom: 20 }} key={category}>
                    <Card.Header padded>
                        <H4>{category.toUpperCase()}</H4>
                    </Card.Header>
                    <Card.Footer padded>
                        <XStack flex={1} />
                        <Button
                            animation="bouncy"
                            elevation="$4"
                            hoverStyle={{
                                scale: 3.0,
                            }}
                            pressStyle={{
                                scale: 4.0,
                            }}
                            onPress={() => router.push(`/(modals)/${category}`)}
                            borderRadius="$10"
                        >
                            View
                        </Button>
                    </Card.Footer>
                </Card>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    }
});