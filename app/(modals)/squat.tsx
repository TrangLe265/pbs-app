import LiftsByCategory from "@/components/LiftsByCategory";
import { Title, Container,LineSeperator } from "@/tamagui.config";


export default function SquatScreen(){
    
    return (
        <Container>
            <Title>All Squat PRs</Title>
            <LineSeperator/>
            <LiftsByCategory liftCategoryId={2}/>
        </Container>
    )
}