import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import "../components/Reviews.css"

const API_URL = "http://localhost:5005"

function Reviews(){
    const [reviews, setReviews] = useState([])
    const {user} = useContext(AuthContext)

    const getReviews = async ()=>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.get(`${API_URL}/api/reviews/user/${user._id}`,  {headers: {Authorization: `Bearer ${tokenFromStorage}`}})
            setReviews(response.data)
        } catch(err){
            console.log("couln't retrieve reviews", err)
        }
    }

    useEffect(() =>{
        getReviews();
    }, [])

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
                        <div>
                            <div className="rating-star">
                            {ratingStars(review.rating)} 
                            </div>               
                        </div>

                    </div>

                        })
            }
        </div>
    )

}

export default Reviews