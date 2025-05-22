// CreateBoardForm.jsx
import React, { useState} from 'react';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Boardform = () => {
  const [emoji, setEmoji] = useState('📄'); // Default to document emoji
  const [title, setTitle] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const [description, setDescription] = useState('');
  const [favourites, setfavourites] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async() => {
    
    const authtoken=JSON.parse(localStorage.getItem("token"));
  
  try{  const postingboarddata= await axios.post(`${API_URL}/api/boards`,{
      emoji:emoji,
      title:title,
      description:description,
      favourites:favourites
    },
  {
    headers:{
      token:authtoken
    }
  })
  if(postingboarddata.data.success){
    const boardid=postingboarddata.data.singleboard._id;
  navigate(`/boards/${boardid}`);
  }
  else{
    navigate("/tasks");
  }
  }
  catch(e){
    console.log(e); 
  }
  };

  const handleEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

 // Use the same for both Boardform and Boardedit
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
        <span className="ml-2 text-2xl font-bold text-white tracking-wide">Create a New Board</span>
      </div>
      <div className="mb-6">
        <label className="block text-base font-semibold text-blue-300 mb-2">Board Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          onClick={() => navigate("/tasks")}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-base font-semibold transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg text-base font-bold shadow-lg transition"
        >
          Create Board
        </button>
      </div>
    </div>
  </div>
);
};

export default Boardform;
