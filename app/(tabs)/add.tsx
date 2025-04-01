import React, { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    Button,
    Input,
    TextArea,
    XStack,
    YStack,
    Form,
    Spinner,
    H4,
    ScrollView,
    Paragraph,
} from "tamagui";
import { Container, SubTitle, Title, LineSeperator } from "@/tamagui.config";
import supabase from "@/utility/supabaseClient";
import token from "@/utility/token";
import userId from "@/utility/userId";

export default function AddScreen() {
    const [category, setCategory] = useState(0);
    const [weight, setWeight] = useState(0);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [message,setMessage]=useState("All fields are required!")
    const [formKey, setFormKey] = useState(0);
    

    const categoryMap: { [key: string]: number } = {
        Bench: 1,
        Squat: 2,
        Deadlift: 3,
    };

    const handleSubmit = async () => {
       
        const user_id = await userId();
        const accessToken = await token(); // Fetch the token asynchronously

        const API_URL_ADD = process.env.EXPO_PUBLIC_API_URL_ADD || "https://your-default-api-url.com/add";

        if (!category || !weight || !date) {
            setMessage("Missing fields");
            alert("Missing fields");
            return;
        }

        const formattedWeight = Number(parseFloat(weight.toString()).toFixed(2));
        const requestBody = {
            user_id,
            lift_category_id: category,
            date: date.toISOString().split("T")[0],
            weight_lifted: formattedWeight,
        };

        console.log(requestBody);

        try {
            console.log("Attempt to add new data");

            

            const response = await fetch(API_URL_ADD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // Use the fetched token
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error adding lift:", errorData.message);
                alert(`Failed to add lift: ${errorData.message}`);
            } else {
                alert("Lift added successfully!");
                setMessage("Submitted!");
                setCategory(0);
                setWeight(0);
                setDate(new Date());
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setMessage("");
        }
    };

    return (
        <Container>
            <ScrollView key={formKey} keyboardDismissMode={"on-drag"} maxHeight={600} width="95%" padding="$4" borderRadius="$4">
                <YStack>
                    <Title>Add a new record</Title>

                    <Form
                        alignItems="center"
                        minWidth={300}
                        gap="$2"
                        borderWidth={1}
                        borderRadius="$4"
                        backgroundColor="$background"
                        borderColor="$borderColor"
                        padding="$8"
                    >
                        <SubTitle>Select lift type</SubTitle>
                        <XStack gap="$2" justifyContent="center">
                            <Button
                                onPress={() => setCategory(categoryMap["Squat"])}
                                size="$3"
                                theme={category === categoryMap["Squat"] ? "blue" : "active"}
                            >
                                Squat
                            </Button>
                            <Button
                                onPress={() => setCategory(categoryMap["Bench"])}
                                size="$3"
                                theme={category === categoryMap["Bench"] ? "blue" : "active"}
                            >
                                Bench
                            </Button>
                            <Button
                                onPress={() => setCategory(categoryMap["Deadlift"])}
                                size="$3"
                                theme={category === categoryMap["Deadlift"] ? "blue" : "active"}
                            >
                                Deadlift
                            </Button>
                        </XStack>
                        <LineSeperator />

                        <SubTitle>Enter weight</SubTitle>
                        <Input
                            value={weight}
                            onChangeText={(text) => setWeight(parseInt(text) || 0)}
                            width={200}
                            flex={1}
                            size={50}
                            placeholder={`(kg)`}
                            keyboardType="numeric"
                        />
                        <LineSeperator />

                        <SubTitle>Select date</SubTitle>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />
                        <LineSeperator />

                        <Button onPress={()=>handleSubmit()} theme={"active"}>
                            Submit
                        </Button>
                        
                    </Form>
                    
                </YStack>
            </ScrollView>
        </Container>
    );
}
// Import the handleSubmit function from the service file