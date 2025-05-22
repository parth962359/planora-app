import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Tasksform() {
  const API_URL = import.meta.env.VITE_API_URL;
    let [title,settitle]=useState("");
    let [description,setdescription]=useState("");
    let [Duedate,setDuedate]=useState("");
    let [status,setstatus]=useState("in_progress");
    const navigate=useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem("token")){
        navigate("/signin");
      }
    },[navigate])
    
   const handleclick = async (e) => {
  e.preventDefault();
  const authtoken = JSON.parse(localStorage.getItem("token"));
  console.log(authtoken);

  try {
    const response = await axios.post(
      `${API_URL}/api/tasks`,
      {
        title: title,
        description: description,
        Duedate: Duedate,
        status: status,
      },
      {
        headers: {
          "token": authtoken, // This is now in the correct third argument
        },
      }
    );

    if (response.data.success) {
      alert("Task added");
      navigate("/tasks");
    }
  } catch (e) {
    console.log(e);
    // Optional: alert(e.response?.data?.message || "Something went wrong");
  }
};


    
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Add New Task</h2>
      <form>
        <label className="block text-gray-300 mb-1">Task Title:</label>
        <input
          type="text"
          name="title"
          required
          onChange={(e) => settitle(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-300 mb-1">Task Description:</label>
        <textarea
          name="description"
          required
          onChange={(e) => setdescription(e.target.value)}
          className="w-full h-56 mb-4 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            onClick={() => navigate("/tasks")}
            className="px-4 py-2 rounded bg-gray-600 text-gray-200 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleclick}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
)
}

export default Tasksform