import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import "../components/Reviews.css"
import AddReview from "./AddReview"
import { API_URL } from "../config"
import { Avatar, Button, Group, Text } from "@mantine/core"

function Reviews({revieweeId}){
    const [reviews, setReviews] = useState([])
    const {user} = useContext(AuthContext)
    const [showReviewForm, setShowReviewForm] = useState(false);

    const getReviews = async ()=>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.get(`${API_URL}/api/reviews/user/${revieweeId}`,  {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
            console.log(response.data)
            setReviews(response.data)
        } catch(err){
            console.log("couln't retrieve reviews", err)
        }
    }

    useEffect(() =>{
        if (revieweeId) {
            getReviews();
        }
    }, [revieweeId])

    const ratingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<span key={i} className="star">&#9733;</span>);
          } else {
            stars.push(<span key={i} className="star">&#9734;</span>);
          }
        }
        return stars;
      };

    return(
        <div style={{ marginTop: "30px" }}>
            {reviews.length === 0 ? (
                <Text mb={30}>No reviews available</Text>
                ) :(
                reviews.map((review)=>(
                    <div key={review._id} style={{ marginBottom: "40px" }}>
                        <Group>
                            <Avatar src={review.reviewer.profilePic} alt="reviewer image" radius="xl" />
                            <div>
                                <Text size="sm">{review.reviewer.fullName}</Text>
                                <div>{ratingStars(review.rating)} </div> 
                            </div>   
                        </Group>
                        <Text pl={54} pt="sm" size="sm" >    
                            <p>{review.comment}</p>              
                        </Text>     
                    </div>

                )))
            }

            <Button
            variant="filled" 
            color="#00E59B"
            style={{color:"black"}}
            onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? "Cancel" : "Leave a review"}
            </Button>
            {showReviewForm && <AddReview revieweeId={revieweeId} />}
        </div>
    )

}

export default Reviews