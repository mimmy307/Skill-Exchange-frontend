import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"

const API_URL = "http://localhost:5005"

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
        <div className="reviews-container">
            <h2>Add Review</h2>
            <form onSubmit={handleSubmit}>
                <div> 
                    <label>Rate</label>
                    <input 
                        type="number"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                    />
                </div>
                
                <div>
                    <label>Your review</label>
                    <textarea 
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>

            </form>

        </div>
    )

}

export default AddReview