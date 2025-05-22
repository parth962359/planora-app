import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Card from './Card';
import { useNavigate,useParams } from 'react-router-dom';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const Section = ({ mystate, sectiondiv,onupdate, lastMovedCard }) => {

const API_URL = import.meta.env.VITE_API_URL;
    let parentdata=mystate;
    const [verifying,setverifying]=useState(false);
    const [verifychildcard,setverifychildcard]=useState(false);
      const [showInput, setShowInput] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [carddescription, setcarddescription] = useState('');
  const [cards, setCards] = useState([]);
    const {boardid} =useParams();
    const navigate=useNavigate();

    const deletesection=async()=>{
    const sectionid =sectiondiv._id;
    // console.log(sectionid);
    try{
        const authtoken=JSON.parse(localStorage.getItem("token"));
        const deleteingsection=await axios.delete(`${API_URL}/api/sections/${sectionid}`, {
        headers: {
          token:authtoken,
        },
        data: { boardid: boardid }, // If you need to send boardid in body
      })
if(deleteingsection.data.success){
    // navigate(`/boards/${boardid}`);
    onupdate(!parentdata);
}
    }
    catch(e){
        console.log(e);
    }
}
//addingcardhandler;

const handleAddCard=async()=>{

     try{
      // const sectionid=sectiondiv._id;
        const authtoken=JSON.parse(localStorage.getItem("token"));
        const response=await axios.post(`${API_URL}/api/cards/${sectiondiv._id}`, {
          title:cardTitle,
          description:carddescription
        },{
          headers:{
            token:authtoken
          }
        })
if(response.data.success){
    // navigate(`/boards/${boardid}`);
    setverifying(!verifying);
    setCardTitle("");
    setShowInput(false);
    
}
    }
    catch(e){
        console.log(e);
    }
}

const updateparent=(childdata)=>{
  setverifychildcard(childdata);
}

useEffect(()=>{

const gettingallcards=async()=>{

     try{
      const sectionid=sectiondiv._id;
        const authtoken=JSON.parse(localStorage.getItem("token"));
        const response=await axios.get(`${API_URL}/api/cards/${sectionid}`,{
          headers:{
            token:authtoken
          }
        })
if(response.data.success){
    // navigate(`/boards/${boardid}`);
    setCards(response.data.allcard);
}
    }
    catch(e){
        console.log(e);
    }
}
gettingallcards();

 if (
      lastMovedCard &&
      (lastMovedCard.from === sectiondiv._id || lastMovedCard.to === sectiondiv._id)
    ) {
      setCards((prevCards) => {
        // Remove card if it was moved out
        let newCards = prevCards.filter(card => card._id !== lastMovedCard.cardId);
        // Add card if it was moved in
        if (lastMovedCard.to === sectiondiv._id && lastMovedCard.cardData) {
          newCards = [
            ...newCards.slice(0, lastMovedCard.toIndex),
            lastMovedCard.cardData,
            ...newCards.slice(lastMovedCard.toIndex)
          ];
        }
        return newCards;
      });
    }



},[verifying,verifychildcard,lastMovedCard, sectiondiv._id])


  return (
  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-4 rounded-2xl min-w-[390px] max-w-[400px] shadow-2xl flex flex-col gap-4 border border-gray-700 transition-all duration-200 hover:shadow-blue-700">
    {/* Section Header */}
    <div className="flex justify-between items-center bg-gray-700 p-4 rounded-xl shadow-md">
      <span className="flex items-center gap-2">
        <span className="text-2xl">{sectiondiv.emoji}</span>
        <span className="text-white font-semibold break-all text-lg">{sectiondiv.title}</span>
      </span>
      <span className="text-gray-400 hover:text-red-400 px-3 cursor-pointer transition" onClick={deletesection}>
        <FaTrash />
      </span>
    </div>
    {/* Cards List */}
    <Droppable droppableId={sectiondiv._id} type="CARD">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="min-h-[120px] flex flex-col gap-3"
        >
          {cards.map((card, cardIndex) => (
            <Draggable key={card._id} draggableId={card._id} index={cardIndex}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="mb-2"
                >
                  <Card
                    card={card}
                    updatedata={updateparent}
                    newstate={verifychildcard}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    {/* Add Card */}
    {showInput ? (
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          placeholder="Enter card title"
          className="p-2 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-green-600 h-10 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={handleAddCard}
        >
          Done
        </button>
      </div>
    ) : (
      <button
        onClick={() => setShowInput(true)}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        + Add Card
      </button>
    )}
  </div>
);
};

export default Section;
