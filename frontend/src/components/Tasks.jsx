import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus  } from 'react-icons/fa';
import TaskCard from './Taskcard'
import axios from 'axios';
import Sidebar from "./Sidebar"

function Tasks() {
    const navigate=useNavigate();
   const API_URL = import.meta.env.VITE_API_URL;

    const [taskdata,settaskdata]=useState([]);

    useEffect(()=>{

      if(!localStorage.getItem("token")){
        navigate("/signin");
      }

        const authtoken = JSON.parse(localStorage.getItem("token"));
        console.log(authtoken);
        
        const fetchtask=async()=>{
            try{
                const fetchdata=await axios.get(`${API_URL}/api/tasks`,{
                    headers:{
                       "token":authtoken // Use Authorization header with Bearer token
                    }
                })
                console.log(fetchdata.data);
                
                if(fetchdata.data.success){
                    settaskdata(fetchdata.data.tasks);
                }
                else{
                    alert("something went wrong");
                    
                }
            }
            catch(e){
                console.log(e);
                alert("something went wrong");
            }

        }
        fetchtask();
    },[])


 return (
  <div className="min-h-screen flex bg-gray-900">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 pl-72 pr-8 py-10 bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-wide">Your Tasks</h1>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-full shadow-lg text-3xl p-4 transition z-50"
          onClick={() => { navigate("/Tasksform") }}
          title="Add Task"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-wrap gap-8">
        {taskdata.length === 0 ? (
          <div className="text-gray-400 text-xl mt-20 w-full text-center">No tasks found. Click <span className="text-blue-400 font-bold">+</span> to add one!</div>
        ) : (
          taskdata.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>
    </div>
  </div>
)
}

export default Tasks