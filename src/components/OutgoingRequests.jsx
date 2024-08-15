import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import axios from "axios"
import Card from 'react-bootstrap/Card';
import "../components/Requests.css"
import { API_URL } from "../config";
import { Table, Group, Avatar, Text, Badge } from "@mantine/core";

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

    const statusColors = {
        pending: 'orange',
        accepted: 'blue',
        completed: 'green',
        rejected: 'red',
      };

    const rows = requests.map((request) =>(
        <Table.Tr key={request._id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} src={request.offerer.profilePic} radius={40}/>
                    <Text fz="sm" fw={500}>
                        {request.offerer.fullName}
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
                <Badge color={statusColors[request.status.toLowerCase()]} variant="light">
                {request.status}</Badge>
            </Table.Td>
        </Table.Tr>
    ))


    return(
        <div>
            {requests.length === 0 ? (
                <p>No outgoing requests</p>
            ) : (
                <Table.ScrollContainer minWidth={800} mt="lg">
                    <Table verticalSpacing="sm">
                        <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Offerer</Table.Th>
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
    )
}

export default OutgoingRequests