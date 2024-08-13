import { SimpleGrid, Card, Image, Text, Container } from '@mantine/core';
import home from "../assets/Images/Categories/11.png"
import creative from "../assets/Images/Categories/33.png"
import tech from "../assets/Images/Categories/22.png"
import classes from "../components/CategorySection.module.css"

const categories =[
    {
        image: home ,
        title: "Home and Garden"
    },
    {
        image: creative,
        title: "Creative and Design"
    },
    {
        image: tech,
        title: "Tech and Digital"
    }
]
function CategorySection(){

    return(

        <Container size="xl" className={classes.container}>
        <Text className={classes.title}>Skill Categories at a Glance</Text>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" > 
            {categories.map((category)=>{
                return(
                    <Card key={category.title} shadow="sm" padding="lg" radius="lg" withBorder>
                        <Card.Section>
                            <Image 
                                src={category.image}
                                height={250}
                                />
                        </Card.Section>
                        <Text className={classes.cardTitle}>
                            {category.title}
                        </Text>
                    </Card>

                )
            })}

        </SimpleGrid>

        <Text className={classes.bottomText}>…and much more to explore! </Text>
        </Container>

        
    )

   



}

export default CategorySection