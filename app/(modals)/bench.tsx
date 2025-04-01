import LiftsByCategory from "@/components/LiftsByCategory";
import { Title, Container,LineSeperator } from "@/tamagui.config";


export default function BenchScreen(){
    
    return (
        <Container>
            <Title>All Bench PRs</Title>
            <LineSeperator/>
            <LiftsByCategory liftCategoryId={1}/>
        </Container>
    )
}