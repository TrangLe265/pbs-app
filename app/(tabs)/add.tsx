import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input, TextArea, XStack, YStack, Form, Spinner, H4, ScrollView, Paragraph, Separator} from 'tamagui'; 

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
        <SafeAreaView style={styles.container}>
        
            <ScrollView maxHeight={600}
                    width="95%"
                    padding="$4"
                    borderRadius="$4">

                <YStack>
                <H4>Add a new record</H4>
                
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
                    <Paragraph>Select lift type</Paragraph>

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

                    <Separator marginVertical={5}/>

                    <Paragraph>Enter weight</Paragraph>
                    <Input width={200} flex={1} size={50} placeholder={`(kg)`} />
                    <Separator marginVertical={15} />
            
                        <Paragraph>Select date</Paragraph>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(e) => onChange(e,date)}
                        />
                   <Separator marginVertical={15} />
                    <Form.Trigger asChild disabled={status !== ''}>
                        <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                        Submit
                        </Button>
                    </Form.Trigger>
                </Form>
                    
                </YStack>

            </ScrollView> 
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 16,
    },
})