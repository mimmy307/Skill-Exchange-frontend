import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import { Row, Col, Card } from 'react-bootstrap';
import "../components/Requests.css"

const API_URL = 'http://localhost:5005';

function IncomingRequests(){
    const {user} = useContext(AuthContext)
    const [requests, setRequests] = useState([])

    const getIncomingRequests = async () =>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{
            const response = await axios.get(`${API_URL}/api/skillRequest/incoming/${user._id}`, 
            {headers: { Authorization: `Bearer ${tokenFromStorage}` } })
            setRequests(response.data)
        }catch(err){
            console.log("couldn't fetch incoming requests", err)
        }
    }

    useEffect(()=>{
        getIncomingRequests()
    }, [user._id])

    return (
    //     <div>
    //         <h3>Incoming Requests</h3>
    //         <Row>
    //             {requests.length === 0 ? (
    //                 <p>No incoming requests</p>
    //             ) : (
    //                 requests.map(request => (
    //                     <Col md={4} key={request._id} className="mb-3">
    //                         <Card>
    //                             <Card.Body>
    //                                 <Card.Title>Skill: {request.skill.skillName}</Card.Title>
    //                                 <Card.Subtitle className="mb-2 text-muted">
    //                                     From: {request.requester.fullName}
    //                                 </Card.Subtitle>
    //                                 <Card.Text>
    //                                     Tokens: {request.tokens}
    //                                     <br />
    //                                     Status: <span className={`status-${request.status}`}>{request.status}</span>
    //                                 </Card.Text>
    //                             </Card.Body>
    //                         </Card>
    //                     </Col>
    //                 ))
    //             )}
    //         </Row>
    //     </div>
    // );
   
        <div>
            {requests.length === 0 ? (
                <p>No incoming requests</p>
            ) : (
                requests.map(request => (
                    <Card key={request._id} >
                        <Card.Body>
                            <Card.Title>Skill: {request.skill.skillName}</Card.Title>
                            <Card.Subtitle >
                                From: {request.requester.fullName}
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
        
    );


}

export default IncomingRequests