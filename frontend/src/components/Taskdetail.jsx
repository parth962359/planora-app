import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Taskedit from './Taskedit';

const getstatuscolor = (status) => {
    switch(status){
        case "in_progress":
            return "bg-yellow-400";
            case "pending":
                return "bg-red-400";
                case "completed":
                    return "bg-green-400";
                    default:
                        return "bg-gray-400";
    }
}

const TaskDetail = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  
  let [title,settitle]=useState("");
    let [description,setdescription]=useState("");
    let [status,setstatus]=useState("");
    let [Duedate,setDuedate]=useState("");
    let [creationdate,setcreationdate]=useState("");
  
  const authtoken = JSON.parse(localStorage.getItem("token"));
  useEffect(()=>{
    
    const fetchtask=async()=>{
try{
const fetchdata=await axios.get(`${API_URL}/api/tasks/${id}`,{
    headers:{
        "token":authtoken
    }
})
if(fetchdata.data.success){
console.log(fetchdata);

       settitle(fetchdata.data.tasks[0].title || "");
        setdescription(fetchdata.data.tasks[0].description || "");
        setcreationdate(fetchdata.data.tasks[0].creationdate || "");
        setstatus(fetchdata.data.tasks[0].status || "");
        setDuedate(fetchdata.data.tasks[0].Duedate || "");
    
}
}
catch(e){
    console.log(e);
    
}
}
fetchtask();

},[])


const deletetask=async()=>{
  // const authtoken=JSON.parse(localStorage.getitem("token"));
  try{
    const deleting=await axios.delete(`${API_URL}/api/tasks/${id}`,{
      headers:{
        "token":authtoken
      }
    })
  if(deleting.data.success){
    alert("taskdeleted");
    navigate("/tasks");

  }
  }
  catch(e){
    console.log(e);
    alert("something wenst wrong");
  }
}
  

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-2xl min-h-[500px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">{title}</h2>
          <button
            className="text-red-400 text-2xl font-bold hover:text-red-600 transition"
            onClick={() => navigate('/tasks')}
            title="Close"
          >✖</button>
        </div>
        <div className="mb-8">
          <p className="text-lg text-gray-200 break-words leading-relaxed min-h-[120px]">{description}</p>
        </div>
        <div className="flex flex-wrap gap-6 mb-8">
          <div>
            <span className="block text-gray-400 text-sm">Created:</span>
            <span className="text-gray-200 text-base">{creationdate}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-sm">Due:</span>
            <span className="text-gray-200 text-base">{Duedate}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-sm">Status:</span>
            <span className={`inline-block px-4 py-1 ${getstatuscolor(status)} text-white text-base rounded-full font-semibold mt-1`}>
              {status ? status.replace("_", " ").toUpperCase() : "Loading..."}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-6 justify-end mt-8">
        <button
          className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-lg shadow transition"
          onClick={() => { navigate(`/edittasks/${id}`) }}
        >
          Edit
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow transition"
          onClick={deletetask}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
};

export default TaskDetail;
