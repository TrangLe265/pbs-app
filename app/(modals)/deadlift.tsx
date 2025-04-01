import LiftsByCategory from "@/components/LiftsByCategory";
import { Title, Container,LineSeperator } from "@/tamagui.config";


export default function DeadliftScreen(){
    
    return (
        <Container>
            <Title>All Deadlifts PRs</Title>
            <LineSeperator/>
            <LiftsByCategory liftCategoryId={3}/>
        </Container>
    )
}