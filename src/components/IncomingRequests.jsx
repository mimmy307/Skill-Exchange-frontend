import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import { Row, Col, Card } from 'react-bootstrap';
import "../components/Requests.css"
import { API_URL } from "../config";
import { Avatar, Group, Table, Text, Select } from "@mantine/core";


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

    const handleStatusChange = async (requestId, newStatus) =>{
        const tokenFromStorage = localStorage.getItem("authToken")
        try{ 
            const response = await axios.put(`${API_URL}/api/skillRequest/${requestId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${tokenFromStorage}` } }
              );
           getIncomingRequests();
        }catch (err) {
            console.log("Couldn't update status", err);
          }
    }

    const rows = requests.map((request) =>(
        <Table.Tr key={request._id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} src={request.requester.profilePic } radius={40}/>
                    <Text fz="sm" fw={500}>
                        {request.requester.fullName}
                    </Text>
                </Group>
            </Table.Td>

            <Table.Td>
                <Text fz="sm">{request.skill.skillName}</Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm">{request.tokens}</Text>
            </Table.Td>

            <Table.Td>
                <Select
                data={['Pending', 'Accepted', 'Completed', 'Rejected']}
                defaultValue={request.status}
                onChange={(value) => handleStatusChange(request._id, value)}
                />
            </Table.Td>

        </Table.Tr>
    ))

    return (
        <div>
            {requests.length === 0 ? (
                <p>No incoming requests</p>
            ) : ( 
                <Table.ScrollContainer minWidth={800} mt="lg" >
                    <Table verticalSpacing="md" >
                        <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Requester</Table.Th>
                            <Table.Th>Skill</Table.Th>
                            <Table.Th>Token Rate</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>

            )}
        </div>
        
    );


}

export default IncomingRequests