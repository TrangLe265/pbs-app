import token from "@/utility/token";
import userId from "@/utility/userId";
import { useState } from "react"
import { Text } from "react-native"

export default function SquatScreen(){
    const [list,setList]=useState(['']); 

    const handleFetch = async() => {
        const user_id = await userId();
        const accessToken = await token(); 
        const API_URL_ADD = process.env.EXPO_PUBLIC_API_URL_ADD || "https://your-default-api-url.com/add";

        try{
            const respone = await fetch("http://192.168.1.101:3000/categories/squat")
        }catch{

        }

    }
    return (
        <>
            <Text>Squat</Text>
        </>
    )
}