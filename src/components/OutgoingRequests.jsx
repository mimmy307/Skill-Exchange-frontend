import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import Card from 'react-bootstrap/Card';
import "../components/Requests.css"
import { API_URL } from "../config";

function OutgoingRequests(){
    const {user} = useContext(AuthContext)
    const [requests, setRequests] = useState([])

    const getOutgoingRequests = async () =>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.get(`${API_URL}/api/skillRequest/outgoing/${user._id}`, 
            {headers: { Authorization: `Bearer ${tokenFromStorage}` } })
            setRequests(response.data)
        }catch(err){
            console.log("couldn't fetch outgoing requests", err)
        }
    }

    useEffect(()=>{
        getOutgoingRequests()
    }, [user._id])

    return(
        <div>
            {requests.length === 0 ? (
                <p>No outgoing requests</p>
            ) : (
                requests.map(request => (
                    <Card key={request._id} >
                        <Card.Body>
                            <Card.Title>Skill: {request.skill.skillName}</Card.Title>
                            <Card.Subtitle >
                                Offered by: {request.offerer.fullName}
                            </Card.Subtitle>
                            <Card.Text>
                                Tokens: {request.tokens}
                                <br />
                                Status: <span className={`status-${request.status}`}>{request.status}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    )
}

export default OutgoingRequests