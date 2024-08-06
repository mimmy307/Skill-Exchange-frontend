import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import "../components/Reviews.css"
import AddReview from "./AddReview"

const API_URL = "http://localhost:5005"

function Reviews({revieweeId}){
    const [reviews, setReviews] = useState([])
    const {user} = useContext(AuthContext)
    const [showReviewForm, setShowReviewForm] = useState(false);

    const getReviews = async ()=>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.get(`${API_URL}/api/reviews/user/${revieweeId}`,  {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
            setReviews(response.data)
        } catch(err){
            console.log("couln't retrieve reviews", err)
        }
    }

    useEffect(() =>{
        getReviews();
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
        <div>
            {reviews &&
                reviews.map((review)=>{
                    <div className="user-review-card" >
                        <div className="reviewer-info">
                            <img src={review.reviewer.profilePic} alt="reviewer image"/>
                            <p>{review.reviewer.fullName}</p>
                        </div>
                        <div className="review-text">
                            <div className="rating-star">
                            {ratingStars(review.rating)} 
                            </div> 
                            <p>{review.comment}</p>              
                        </div>
                        
                    </div>

                        })
            }

            <button onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? "Cancel" : "Leave a review"}
            </button>
            {showReviewForm && <AddReview revieweeId={revieweeId} />}
        </div>
    )

}

export default Reviews