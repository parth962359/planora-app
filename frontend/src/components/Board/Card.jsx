import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Card({card,updatedata,newstate}) {
    const {boardid}=useParams();
    const navigate=useNavigate();

      const deletecard=async()=>{
        try {
              const authtoken=JSON.parse(localStorage.getItem("token"));
             const response=await axios.delete(`http://localhost:3000/api/cards/${card._id}`,{
                headers:{
                    token:authtoken
                },
                data:{
                    sectionid:card.sectionid,
                }
            })
            if(response.data.success){
                updatedata(!newstate);
            }
            
        } catch (e) {
            console.log(e);
            
        }
      }

      

return (
  <div className="bg-gray-900 rounded-xl flex flex-col flex-grow p-4 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-200">
    <div className="flex justify-between items-center">
      <h4
        className="cursor-pointer text-white font-bold text-lg truncate"
        onClick={() => navigate(`/sections/${boardid}/${card.sectionid}/${card._id}`)}
      >
        {card.title}
      </h4>
      <button
        className="text-red-500 hover:bg-red-600 hover:text-white cursor-pointer text-sm w-7 h-7 flex items-center justify-center rounded-full transition"
        onClick={deletecard}
        title="Delete Card"
      >
        ✖
      </button>
    </div>
    {/* Optionally, add card description or other info here */}
  </div>
);
}

export default Card