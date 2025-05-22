import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from"axios";

function Signin() {
const API_URL = import.meta.env.VITE_API_URL;
let [email, setemail]= useState('')
let [username, setusername]= useState('')
let [password, setpassword]= useState('')
let [isSignedIn, setisSignedIn]= useState(false);
const navigate=useNavigate();
let handleclick=(e)=>{
  e.preventDefault();
  postdata();
}

let postdata = async () => {
  const data = {
    username:username,
    email: email,
    password: password,
  };

  try {
    // Use the full backend URL if the backend is running on a different port
    const response = await axios.post(`${API_URL}/api/signin`, data);

    // Check if the response indicates success
    if (response.data.success) {
      alert("Signin successful");
      localStorage.removeItem("token"); // Remove any existing token
      localStorage.removeItem("username"); // Remove any existing token
      localStorage.setItem("token", JSON.stringify( response.data.token));
      localStorage.setItem("username", JSON.stringify( response.data.username));
      setisSignedIn(true); // Redirect to the signin page
    } else {
      alert(response.data.message || "Signin failed");
    }
  } catch (e) {
    // Log the error and display an appropriate message
    console.error(e.response?.data || e.message);
    alert(e.response?.data?.message || "An error occurred during signin.");
  }
};
 useEffect(() => {
    if (isSignedIn) {
      navigate("/tasks"); // Navigate to the tasks page
    }
  }, [isSignedIn, navigate]);


 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] via-[#1c1c1c] to-[#414345]">
    <div className="backdrop-blur-md bg-gray-900/90 border border-blue-900 shadow-2xl rounded-3xl p-10 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">Sign in to <span className="text-blue-400">Planora</span></h1>
      <form>
        <div className="mb-6">
          <label htmlFor="username" className="block text-base font-semibold text-blue-300 mb-2">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-base font-semibold text-blue-300 mb-2">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            required
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block text-base font-semibold text-blue-300 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          onClick={handleclick}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg text-lg font-bold shadow-lg transition mb-4"
        >
          Sign In
        </button>
        <button
          type="submit"
          onClick={()=>{navigate("/")}}
          className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg text-lg font-bold shadow-lg transition mb-4"
        >
          Cancel
        </button>
        <div className="text-center mt-4 text-gray-400">
          <span>Don't have an account? </span>
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  </div>
)
}

export default Signin