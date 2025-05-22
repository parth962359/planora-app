import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Section from './Section.jsx';
import Picker from 'emoji-picker-react';

const Newboard = () => {
    const [verifing,setverifing]=useState(false);
    const [lastMovedCard, setLastMovedCard] = useState(null);
 const [emoji, setEmoji] = useState('📄');
 const [showEmojiPicker, setShowEmojiPicker] = useState(false);
      const [showSectionInput, setShowSectionInput] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [sections, setSections] = useState([]);

    let [boarddata,setboarddata]=useState({});
    const {boardid} =useParams();
    let navigate=useNavigate();
    const authtoken=JSON.parse(localStorage.getItem("token"));

const updatingfromchild=(somedata)=>{

    setverifing(somedata);
}



    useEffect(()=>{
 const fetchboarddata=async()=>{
    try{

        const gotdata=await axios.get(`http://localhost:3000/api/boards/${boardid}`,{
            headers:{
                token:authtoken
            }
        })

        if(gotdata.data.success){
            setboarddata(gotdata.data.boards[0]);
            console.log(gotdata);
            
        }
    }
    catch(e){
        console.log(e);
        navigate("/tasks")
    }
 }
 fetchboarddata();

 const fetchsectiondata=async()=>{
    try{
        const authtoken=JSON.parse(localStorage.getItem("token"));
        const fetchsection=await axios.get(`http://localhost:3000/api/sections/${boardid}`,{
            headers:{
                token:authtoken
            }
        })
         if (fetchsection.data.success) {
        setSections(fetchsection.data.allsections); // Assuming section is returned
        setEmoji("📄");
        setSectionTitle('');
        setShowSectionInput(false);
      }
    }
    catch(e){
        console.log(e);
        
    }
}
fetchsectiondata();
    },[verifing,boardid])
    

const onDragEnd = async (result) => {
  if (!result.destination) return;
  // Only handle card drag between sections
  if (result.type === "CARD") {
    const sourceSectionId = result.source.droppableId;
    const destSectionId = result.destination.droppableId;
   const toIndex = result.destination.index;
   // Find the card being moved
   const sourceSection = sections.find(sec => sec._id === sourceSectionId);
   if (!sourceSection) return;
   
   const cardId = result.draggableId;
   let cardData = null;

    // Now you can call your backend to update the card's section
    console.log("functioncalled");
    console.log(destSectionId);
    console.log(cardId);

    
    const authtoken = JSON.parse(localStorage.getItem("token"));
   try{ 
    const response=await axios.put(`http://localhost:3000/api/cards/${cardId}/move`, {
      sectionid: destSectionId
    }, {
      headers: {
        token: authtoken
      }
    });
    if(response.data.success){
        setLastMovedCard({
          cardId,
          from: sourceSectionId,
          to: destSectionId,
          toIndex,
          cardData: response.data.gotcard // If your backend returns the moved card data
        });
    }
  }
  catch(e){
    console.log(e);
    
  }
  setverifing(v => !v); 
  
}
};


//deleteing board
const deleteboard=async()=>{
    try{
  const deleteingboard=await axios.delete(`http://localhost:3000/api/boards/${boardid}`,{
    headers:{
        token:authtoken
    }
})
if(deleteingboard.data.success){
    navigate("/tasks");
}
    }
    catch(e){
        console.log(e);
    }
}

//emojisection
const handleEmojiClick=(emojidata)=>{
setEmoji(emojidata.emoji);
setShowEmojiPicker(!showEmojiPicker);
}


const handleAddSection=async()=>{
    try{
        const authtoken=JSON.parse(localStorage.getItem("token"));
        const postsection=await axios.post(`http://localhost:3000/api/sections/${boardid}`,{
            emoji:emoji,
            title:sectionTitle,
            
        },{
            headers:{
                token:authtoken
            }
        })
         if (postsection.data.success) {
        setverifing(!verifing);
      }
    }
    catch(e){
        console.log(e);
        
    }
}



  return (
  <div className="w-full flex bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 min-h-screen">
    <div>
      <Sidebar />
    </div>

    <div className="flex-1 pl-72 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white min-h-screen p-10">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-start">
            <span className="text-7xl drop-shadow-lg">{boarddata.emoji}</span>
            <h1 className="text-5xl font-extrabold tracking-tight mt-2 mb-2 text-white drop-shadow-lg">{boarddata.title}</h1>
            <div className="text-gray-400 text-lg max-w-2xl italic">{boarddata.description}</div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-yellow-400 hover:text-yellow-300 bg-gray-800 hover:bg-gray-700 rounded-full p-3 shadow transition" title="Edit Board">
            <FaEdit size={22} onClick={() => { navigate(`/editboard/${boardid}`) }} />
          </button>
          <button className="text-red-500 hover:text-red-400 bg-gray-800 hover:bg-gray-700 rounded-full p-3 shadow transition" title="Delete Board">
            <FaTrash size={22} onClick={deleteboard} />
          </button>
        </div>
      </div>

      {/* Section Input */}
      {showSectionInput ? (
        <div className="mt-6 flex gap-4 items-center bg-gray-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-3xl cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              {emoji}
            </span>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} theme="dark" />}
          </div>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="Enter section title"
            className="p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-green-600 h-10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 shadow transition"
            onClick={handleAddSection}
          >
            Done
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSectionInput(true)}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow transition"
        >
          + Add Section
        </button>
      )}

      {/* Kanban Sections */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-sections" direction="horizontal" type="SECTION">
          {(provided) => (
            <div
              className="flex flex-wrap  mt-10 gap-8 pb-8"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: "70vh" }}
            >
              {sections.map((section, idx) => (
                <Section
                  key={section._id}
                  mystate={verifing}
                  onupdate={updatingfromchild}
                  sectiondiv={section}
                  lastMovedCard={lastMovedCard}
                  index={idx}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  </div>
);
};

export default Newboard;
