import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom"
import service from "../services/file-upload.service";

function AddSkills(){
    const [image, setImage] = useState("")
    const [skillName, setSkillName] = useState("")
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("remote")
    const [tokenRate, setTokenRate] = useState(0)
    const [isloading, setIsLoading] = useState(false)

    const {user} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleFileUpload = async (e) =>{
        setIsLoading(true)

        const uploadData= new FormData();
        uploadData.append("image", e.target.files[0]);

        try{
            const response = await  service.uploadImage(uploadData);
            setImage(response.fileUrl)
            setIsLoading(false)
        }catch(err){console.log("error while uploading file:", err)}
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const newSkill = {
        image,
        skillName,
        description,
        location,
        tokenRate,
        user: user._id 
        }

        try{
            const skillResponse = await service.createSkill(newSkill);
            navigate("/dashboard")
        }
        catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    return(
        <div className="add-skill-container">
            <h2>Add Skill</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Skill Name</label>
                    <input 
                        type="text"
                        name="skillName"
                        value= {skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value= {description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Location</label>
                    <select value={location} onChange={(e)=> setLocation(e.target.value)}> 
                        <option value="remote">Remote</option>
                        <option value="in-person">In-Person</option>   
                    </select>
                       
                </div>
                <div>
                    <label>Token Rate</label>
                    <input 
                        type="number"
                        name="tokenRate"
                        value= {tokenRate}
                        onChange={(e) => setTokenRate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileUpload}
                     />
                </div>
                <button disabled={isloading} type="submit">Add Skill</button>
            </form>

        </div>
    )


}

export default AddSkills