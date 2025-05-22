import React, { useEffect ,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Picker from 'emoji-picker-react';

function Boardedit() {
  
  const [emoji, setEmoji] = useState(''); // Default to document emoji
   const [title, settitle] = useState('');
   const [description, setDescription] = useState('');
   const [favourites, setfavourites] = useState();
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const API_URL = import.meta.env.VITE_API_URL;
  
    const {boardid} =useParams();
    let navigate=useNavigate();
    const authtoken=JSON.parse(localStorage.getItem("token"));

    useEffect(()=>{
 const fetchboarddata=async()=>{
    try{

        const gotdata=await axios.get(`${API_URL}/api/boards/${boardid}`,{
            headers:{
                token:authtoken
            }
        })

        if(gotdata.data.success){
            setEmoji(gotdata.data.boards[0].emoji);
            settitle(gotdata.data.boards[0].title);
            setDescription(gotdata.data.boards[0].description);
            setfavourites(gotdata.data.boards[0].favourites);
            
        }
    }
    catch(e){
        console.log(e);
        navigate("/tasks")
    }
 }
 fetchboarddata();
    },[])


    const handleSubmit=async()=>{

      try {
        
        const updatingdata=await axios.put(`${API_URL}/api/boards/${boardid}`,{
          emoji:emoji,
          title:title,
          description:description,
          favourites:favourites
        },{
          headers:{
            token:authtoken
          }
        })

        if(updatingdata.data.success){
          
          
          navigate(`/boards/${boardid}`)
        }

      } catch (e) {
        console.log(e);
        
      }
    }
    const handleEmojiClick=(emojidata)=>{
      setEmoji(emojidata.emoji);
      setShowEmojiPicker(!showEmojiPicker);
    }


    return (
  <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
    <div className="backdrop-blur-md bg-gray-900/80 border border-blue-900 shadow-2xl rounded-3xl p-10 w-full max-w-xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <span
          className="text-4xl cursor-pointer hover:scale-125 transition-transform duration-200"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {emoji}
        </span>
        {showEmojiPicker && (
          <div className="z-50">
            <Picker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}
        <span className="ml-2 text-2xl font-bold text-white tracking-wide">Edit Board</span>
      </div>
      <div className="mb-6">
        <label className="block text-base font-semibold text-blue-300 mb-2">Board Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter board title"
        />
      </div>
      <div className="mb-8">
        <label className="block text-base font-semibold text-blue-300 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter board description"
          rows={4}
        ></textarea>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate(`/boards/${boardid}`)}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-base font-semibold transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg text-base font-bold shadow-lg transition"
        >
          Update Board
        </button>
      </div>
    </div>
  </div>
);
}

export default Boardedit