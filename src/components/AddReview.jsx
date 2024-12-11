import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import { API_URL } from "../config"
import { Button, Group, NumberInput, Stack, Textarea, Title } from "@mantine/core"


function AddReview({revieweeId}){
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const {user} = useContext(AuthContext)

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const newReview = {
            rating,
            comment,
            reviewee: revieweeId,
            reviewer: user._id
        }
        const tokenFromStorage = localStorage.getItem("authToken")

        try{
            const response = await axios.post(`${API_URL}/api/reviews`, newReview,
            {headers: { Authorization: `Bearer ${tokenFromStorage}` } })
            console.log("review added succesfull", response.data)
        } catch (err){
            console.log("couldn't add review", err)
        }
    }

    return(
        <div style={{  margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <Title order={3}  mb="md">Add Review</Title>
            <form onSubmit={handleSubmit}>
                <Stack spacing="md"> 
                    <NumberInput
                        label="Rate (1-5)"
                        value={rating}
                        onChange={(value) => setRating(value)}
                        min={1}
                        max={5}
                        required
                    />
                    <Textarea
                    label="Your Review"
                    placeholder="Write your review here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    minRows={4}
                    required
                    />
                    <Group>
                        <Button 
                        variant="filled" 
                        color="#00E59B"
                        style={{color:"black"}}
                        type="submit">Submit</Button>
                    </Group>
                </Stack>        
          </form>

        </div>
    )

}

export default AddReview