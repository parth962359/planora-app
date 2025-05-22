import { useEffect, useState } from "react";
import { FaTrash} from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editedcard = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const {sectionid,cardid,boardid}=useParams();
  let navigate=useNavigate();

  useEffect(()=>{

    const fetchingcard=async()=>{
        try {
             const authtoken=JSON.parse(localStorage.getItem("token"));
        const response=await axios.get(`${API_URL}/api/card/${sectionid}/${cardid}`,{
          headers:{
            token:authtoken
          }
        })
if(response.data.success){
    // navigate(`/boards/${boardid}`);
    settitle(response.data.allcard[0].title);
    setdescription(response.data.allcard[0].description);
}
        } catch (e) {
            console.log(e);
            
        }
    }
    fetchingcard();  
  },[])

  const handleSave = async() => {
    try {
        const authtoken=JSON.parse(localStorage.getItem("token"));
        
        
        const response=await axios.put(`${API_URL}/api/cards/${cardid}`,
            {
                title:title,
                description:description,
                sectionid:sectionid
            },{
            headers:{
                token:authtoken
            }
        })
        if(response.data.success){
            navigate(`/boards/${boardid}`);
        }
        
    } catch (e) {
        console.log(e);
        
    }
  };


  //deletingcard
  const deletecard=async()=>{
    try {
          const authtoken=JSON.parse(localStorage.getItem("token"));
         const response=await axios.delete(`${API_URL}/api/cards/${cardid}`,{
            headers:{
                token:authtoken
            },
            data:{
                sectionid:sectionid,
            }
        })
        if(response.data.success){
            navigate(`/boards/${boardid}`);
        }
        
    } catch (e) {
        console.log(e);
        
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className=" bg-[#1e1e1e] text-white rounded-lg p-6 w-[700px] max-h-[90vh] overflow-y-auto relative shadow-xl">
        {/* Delete Icon */}
        <button
          onClick={deletecard}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <FaTrash size={20} />
        </button>

        {/* Title Input */}
        <input
          type="text"
          className="w-full text-2xl font-semibold bg-transparent border-b border-gray-600 focus:outline-none mb-4"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Card title"
        />

        {/* Description Textarea */}
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full h-60 bg-[#2a2a2a] text-white p-3 rounded-lg focus:outline-none resize-none"
          placeholder="Card details..."
        />

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={()=>{navigate(`/boards/${boardid}`)}}
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editedcard;
