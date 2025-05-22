import React from 'react';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status) => {
  switch (status) {
    case 'in_progress':
      return 'bg-yellow-400';
    case 'pending':
      return 'bg-red-400';
    case 'completed':
      return 'bg-green-400';
    default:
      return 'bg-gray-200';
  }
};

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  // const API_URL = import.meta.env.VITE_API_URL;

  const truncate = (text, maxWords = 50) =>
    text.slice(0, maxWords) + (text.length > maxWords ? '...' : '');

 return (
  <div
    className="w-[30%] h-56 bg-gray-800 border border-gray-700 rounded-2xl p-4  shadow-xl mb-6 mr-6 cursor-pointer hover:scale-108  hover:shadow-2xl hover:border-blue-500 
    hover: transition-all duration-200 flex flex-col justify-between"
    onClick={() => navigate(`/tasks/${task._id}`)}
  >
    <div>
      <h2 className="text-2xl font-bold mb-2 text-white truncate">{task.title}</h2>
      <div className="text-gray-300 mb-4 h-16 overflow-hidden text-ellipsis">
        {truncate(task.description)}
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs text-gray-400">
        <span>Created: <div className="text-gray-300">{task.creationdate}</div></span>
        <span>Due: <div className="text-gray-300">{task.Duedate}</div></span>
      </div>
      <span
        className={`self-end mt-2 px-4 py-1 text-white text-sm rounded-full font-semibold shadow ${getStatusColor(task.status)}`}
      >
        {task.status.replace('_', ' ').toUpperCase()}
      </span>
    </div>
  </div>
);
};

export default TaskCard;
