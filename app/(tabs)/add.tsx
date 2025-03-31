import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input, TextArea, XStack, YStack, Form, Spinner, H4, ScrollView, Paragraph} from 'tamagui'; 
import { Container, SubTitle, Title, LineSeperator } from "@/tamagui.config";

export default function addScreen(){
    const [category, setCategory] = useState(''); 
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date()); 
    const [showDatePicker, setShowDatePicker] = useState(false); 

    const [status, setStatus] = React.useState<'' | 'submitting' | 'submitted'| 'Missing fields'>(''); 

    const handleSubmit = async () => {
        if (!category || !weight || !date ){
            setStatus("Missing fields"); 
            return;
        }

        try {
            //hosting locally
            const respone = await fetch("http://localhost:3000/lifts", {
            method: "POST", 
            headers: {
                "Content-Type": "application.json",
                Authorization: "Token", 
            }, 
            body: JSON.stringify({
                category,
                weight,
                date: date.toISOString(),
            })
        }); 

        if (!respone.ok) {
            const errorData = await respone.json();
            console.error("Error adding lift:", errorData.message);
            alert(`Failed to add lift: ${errorData.message}`);
        } else {
            alert("Lift added successfully!");
            setStatus("submitted");
            // Reset form fields
            setCategory("");
            setWeight("");
            setDate(new Date());
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
    } finally {
        setStatus("");
    }

    };


    React.useEffect(() => {
        if (status === 'submitting'){
            const timer = setTimeout(() => setStatus(''),2000)
            return () => clearTimeout(timer); 
        }
    },[status])

    return (
        <Container>
        
            <ScrollView maxHeight={600}
                    width="95%"
                    padding="$4"
                    borderRadius="$4">

                <YStack>
                <Title>Add a new record</Title>
               
                
                <Form
                    alignItems="center"
                    minWidth={300}
                    gap="$2"
                    onSubmit={() => setStatus('submitting')} //tamagui Form controlling
                    borderWidth={1}
                    borderRadius="$4"
                    backgroundColor="$background"
                    borderColor="$borderColor"
                    padding="$8"
                >
                    <SubTitle>Select lift type</SubTitle>

                    <XStack gap="$2" justifyContent="center">  
                        <Button size="$3" theme="active">
                            Squat
                        </Button>
                        <Button size="$3" theme="active">
                            Bench
                        </Button>
                        <Button size="$3" theme="active">
                            Deadlift
                        </Button>
                    </XStack>
                    <LineSeperator/>
    

                    <SubTitle>Enter weight</SubTitle>
                    <Input width={200} flex={1} size={50} placeholder={`(kg)`} autoFocus={true} />
                    <LineSeperator/>
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

                   <LineSeperator/>
                    <Form.Trigger asChild disabled={status !== ''}>
                        <Button icon={status === 'submitting' ? () => <Spinner /> : undefined} theme={"active"}>
                        Submit
                        </Button>
                    </Form.Trigger>
                </Form>
                    
                </YStack>

            </ScrollView> 
            
        </Container>
    )
}
