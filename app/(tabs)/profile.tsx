import { Container } from "@/tamagui.config"
import supabase from "@/utility/supabaseClient"
import { Text } from "react-native"
import { Button } from "tamagui"

export default function profileScreen(){
    const handleLogOut = async() => {
        const {error} = await supabase.auth.signOut(); 
    }
    //TODO: reset password
    
    return (
        <Container>
            <Button onPress={() => handleLogOut()}>
                Sign out
            </Button>
        </Container>
    )
}

