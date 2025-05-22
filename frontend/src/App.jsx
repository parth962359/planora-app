import Homepage from "./components/Homepage.jsx";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Tasks from "./components/Tasks.jsx";
import Tasksform from "./components/Tasksform.jsx";
import Taskdetail from "./components/Taskdetail.jsx";
    import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import Taskedit from "./components/Taskedit.jsx";
import Boardform from "./components/Board/Boardform.jsx";
import Newboard from "./components/Board/Newboard.jsx";
import Boardedit from "./components/Board/Boardedit.jsx";
import Editedcard from "./components/Board/Editedcard.jsx";

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} />
    <Route path="/tasks" element={<Tasks/>} />
    <Route path="/tasksform" element={<Tasksform/>} />
    <Route path="/tasks/:id" element={<Taskdetail/>} />
    <Route path="/edittasks/:id" element={<Taskedit/>} />
    <Route path="/createboard" element={<Boardform/>} />
    <Route path="/boards/:boardid" element={<Newboard/>} />
    <Route path="/editboard/:boardid" element={<Boardedit/>} />
    <Route path="/sections/:boardid/:sectionid/:cardid" element={<Editedcard/>} />

      
    </Routes>
    
    </BrowserRouter>
       
    </>
  )
}

export default App
