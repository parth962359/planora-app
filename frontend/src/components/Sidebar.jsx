import React, { useState,useEffect } from 'react';
import { FaSignOutAlt, FaStar, FaLock, FaUser, FaTachometerAlt, FaTasks,FaPlus  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Sidebar = () => {
    const navigate=useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [allboards,setallboards]=useState([]);
    const onLogout=()=>{

        localStorage.removeItem("token");
        navigate("/signin");

    }

const username=localStorage.getItem("username");
const authtoken=JSON.parse(localStorage.getItem("token"));
useEffect(()=>{
const fetchdata=async()=>{
try {
  
const fetchingboards=await axios.get(`${API_URL}/api/boards`,{
  headers:{
    token:authtoken
  }
})
if(fetchingboards.data.success){
setallboards(fetchingboards.data.boards);
}

} catch (e) {
  console.log(e);
  
}
}
fetchdata();

},[])



  return (
    
    <div className="w-64 h-screen bg-gray-900  text-white flex flex-col justify-between p-4 fixed  border-gray-900  border-r-gray-500 border-1"> 
    
      <div>
        <h2 className="text-4xl font-extrabold mt-8 mb-6 break-all">{username.slice(1,(username.length-1))}</h2>
        <hr />
 <div className=" mt-8 mb-4 cursor-pointer  " onClick={()=>{navigate("/createboard")}}>
          <h3 className="flex items-center justify-between  hover:text-white gap-2 font-semibold text-gray-400">
            <div className='flex items-center gap-2'> Add Board </div>

            <button className='hover:text-white cursor-pointer' >
             <FaPlus/>

            </button>
             
             
             </h3>
          
        </div>
         

        <div className="mb-4">
          <h3 className="flex items-center justify-between gap-2 font-semibold text-gray-400">
            <div className='flex items-center gap-2'><FaStar /> Boards</div>

            <button className='hover:text-white cursor-pointer' onClick={()=>{navigate("/createboard")}}>
             <FaPlus/>

            </button>
            </h3>
            <div>
             {allboards.map((board,index)=>(
            
          <ul key={index} className="ml-4 mt-2">
            <li className="hover:text-blue-400 cursor-pointer" onClick={()=>{navigate(`/boards/${board._id}`)}}>{board.title}</li>
          </ul>
             ))}

             </div>
            
        </div>

        <div className="mb-4">
          <h3 className="flex items-center gap-2 hover:text-white cursor-pointer font-semibold text-gray-400" onClick={()=>{navigate("/tasks")}}><FaUser /> Personal Tasks</h3>
        </div>

        <div className="mb-4">
          <h3 className="flex items-center gap-2 font-semibold text-gray-400"><FaTachometerAlt /> Dashboard</h3>
          <ul className="ml-4 mt-2">
            <li className="hover:text-green-400 cursor-pointer">Overview</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white pt-4">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
