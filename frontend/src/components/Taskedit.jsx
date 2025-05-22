import React from 'react'

import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function Taskedit(){
  const API_URL = import.meta.env.VITE_API_URL;
  let [title,settitle]=useState("");
  let [description,setdescription]=useState("");
  let [status,setstatus]=useState("");
  let [Duedate,setDuedate]=useState("");
  let [creationdate,setcreationdate]=useState("");

let navigate= useNavigate();
  let {id} =useParams();
 
  let authtoken=JSON.parse(localStorage.getItem("token"));
  
  
  useEffect(()=>{
    
      if(!localStorage.getItem("token")){
        navigate("/signin");
      }

    const fetchtask=async()=>{
      try{
const fetchdata=await axios.get(`${API_URL}/api/tasks/${id}`,{
    headers:{
        "token":authtoken
    }
})
if(fetchdata.data.success){
  
            settitle(fetchdata.data.tasks[0].title || "");
        setdescription(fetchdata.data.tasks[0].description || "");
        setstatus(fetchdata.data.tasks[0].status || "");
        setcreationdate(fetchdata.data.tasks[0].creationdate || "");
    
}
}
catch(e){
    console.log(e);
    alert("something went wrong");
}
}
fetchtask();

},[navigate])



const handleclick=async(e)=>{
e.preventDefault(); 
try{  const editdata=await axios.put(`${API_URL}/api/tasks/${id}`,{
title:title,
description:description,
creationdate:creationdate,
Duedate:Duedate,
status:status
  },{
    headers:{
      "token":authtoken
    }
  })
  if(editdata.data.success){
    alert("task updated");
    navigate(`/tasks/${id}`);
  }
}
catch(e){
  console.log(e);
  alert("something went wrong");
  
}
}

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Edit Task</h2>
      <form>
        <label className="block font-bold text-gray-300 mb-1">Task Title:</label>
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-300 mb-1">Task Description:</label>
        <textarea
          name="description"
          value={description}
          required
          onChange={(e) => setdescription(e.target.value)}
          className="w-full h-80 mb-4 px-3 py-2 rounded bg-gray-700 text-white overflow-auto no-scrollbar focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-300 mb-1">DueDate & Time:</label>
        <input
          type="datetime-local"
          name="dueDate"
          required
          onChange={(e) => {
            let createddate = new Date(e.target.value).toDateString();
            let indianTime = new Date(e.target.value)
              .toLocaleString('en-IN', { hourCycle: 'h24', hour: '2-digit', minute: '2-digit', second: '2-digit' })
              .slice(0, 5);
            setDuedate(`${createddate} ${indianTime}`);
          }}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-300 mb-1">Status:</label>
        <select
          name="status"
          value={status}
          required
          onChange={(e) => setstatus(e.target.value)}
          className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="in_progress">IN Progress</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(`/tasks/${id}`)}
            className="px-4 py-2 rounded bg-gray-600 text-gray-200 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleclick}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit Task
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default Taskedit;