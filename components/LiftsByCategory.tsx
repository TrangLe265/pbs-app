import React, {useEffect, useState} from 'react'; 
import {
    Button,
    Input,
    XStack,
    YStack,
    Spinner,
    H4,
    ScrollView,
    YGroup,
    ListItem,
    Paragraph,
    Switch, 
    
} from "tamagui";
import { Container, SubTitle, Title } from '@/tamagui.config';
import token from "@/utility/token";
import { Alert } from 'react-native';

//this file define a generic flow for all the Lifts by Category Screen (Squat Screen, Bench Screen, Deadlift Screen)
interface LiftListProps {
    liftCategoryId: number; //each lift category have its own id 
}

export default function LiftList({liftCategoryId}: LiftListProps){
    interface Lift {
        id: number;
        weight_lifted: number;
        date: string;
    }

    const [lifts, setLifts] = useState<Lift[]>([]); 
    const [loading, setLoading] = useState(true); 
    const [isSorted, setIsSorted] = useState(false);

    useEffect(()=> {
        const fetchLifts = async() => {
        
            const accessToken = await token(); 
            const API = `http://localhost:3000/lifts/${liftCategoryId}`; 
    
            try{
                console.log("Attempt to show all data by category")
                const respone = await fetch(API,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
    
                if (!respone.ok){
                    const error = await respone.json(); 
                    console.log("fail to retrieve data")
                }else {
                    const data = await respone.json(); 
                    console.log(data)
                    setLifts(data);
                    setLoading(false); 
                }
            }catch(error){
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
    
        }
     
        fetchLifts(); 
    }, [liftCategoryId])

    const handleDelete = async (liftId: number) => {
        console.log(`Deleting lift with ID: ${liftId}`); // Debugging log
        const accessToken = await token();
        const API = `http://localhost:3000/lifts/${liftId}`;

        try {
            const response = await fetch(API, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Failed to delete lift:", error.message);
                alert(`Failed to delete lift: ${error.message}`);
            } else {
                console.log("Lift deleted successfully!");
                setLifts((prevLifts) => prevLifts.filter((lift) => lift.id !== liftId));
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const confirmDelete = (liftId: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to remove this record?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: () => handleDelete(liftId) }
            ]
        );
    };

    const sortLifts = (lifts: Lift[]): Lift[] => {
        return lifts.sort((a, b) => b.weight_lifted - a.weight_lifted);
    };

    const handleSwitchChange = () => {
        setIsSorted((prev) => !prev);
        if (!isSorted) {
            setLifts((prevLifts) => sortLifts([...prevLifts]));
            console.log(lifts)
        }
    };

    if (loading) return <Spinner />

    return(
        <ScrollView maxHeight={650}
            width="95%"
            padding="$4"
            borderRadius="$4">
                {/*{lifts.length !== 0 ? (
                    <Switch onCheckedChange={() => handleSwitchChange()} size="$2">
                        <Switch.Thumb animation="bouncy" />
                    </Switch>
                ) : null }*/}
                
                {lifts.length === 0 ? (
                    <Container>
                        <Title>No records have been added</Title>
                    </Container>
                    
                ) : (
                
                    lifts.map((lift) => (
                            <ListItem key={lift.id} subTitle={lift.date} marginBottom={3} borderRadius={10}>
                                <XStack flex={1} justifyContent="space-between" alignItems="center">
                                    <Title color={"$blue8Light"}>{lift.weight_lifted} <SubTitle fontWeight={500}>kg</SubTitle></Title>
                                    <Button onPress={()=>confirmDelete(lift.id)} size={'$2'} borderRadius={50} backgroundColor={"$red9Light"}>
                                        <Paragraph fontSize={'$1'} fontWeight={500}>Remove</Paragraph>  
                                    </Button>
                                </XStack>
                            </ListItem>
                    ))
                    
                )}
            
        
        </ScrollView>
    )
}