import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input, TextArea, XStack, YStack, Form, Spinner, H4, ScrollView, Paragraph} from 'tamagui'; 
import { Container, SubTitle, Title, LineSeperator } from "@/tamagui.config";

export default function addScreen(){
    const [date, setDate] = useState(new Date()); 
    const [showDatePicker, setShowDatePicker] = useState(false); 

    const [status, setStatus] = React.useState<'' | 'submitting' | 'submitted'>(''); 

    const onChange = (event: EventTarget, selectedDate: Date) => {
        const currentDate = selectedDate ;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log(date)
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
                        <Button size="$3" theme="accent">
                            Squat
                        </Button>
                        <Button size="$3" theme="accent">
                            Bench
                        </Button>
                        <Button size="$3" theme="accent">
                            Deadlift
                        </Button>
                    </XStack>
                    <LineSeperator/>
    

                    <SubTitle>Enter weight</SubTitle>
                    <Input width={200} flex={1} size={50} placeholder={`(kg)`} />
                    <LineSeperator/>
                    <SubTitle>Select date</SubTitle>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(e) => onChange(e,date)}
                        />

                   <LineSeperator/>
                    <Form.Trigger asChild disabled={status !== ''}>
                        <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                        Submit
                        </Button>
                    </Form.Trigger>
                </Form>
                    
                </YStack>

            </ScrollView> 
            
        </Container>
    )
}
