
import dotenv from "dotenv";
 dotenv.config();

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { object, string } from "zod";
import { hash, compare } from "bcrypt";
import { Usermodel, Taskmodel,Boardmodel,Cardmodel,Sectionmodel } from "./db.js";
import cors from "cors";


const JWT_SECRET = process.env.JWT_SECRET;
const {sign,verify}=jwt;

const startserver=async()=>{

try{
await mongoose.connect(process.env.MONGO_URL)

const app= express();
app.use(cors());

app.use(express.json());


app.post("/api/signup",async(req,res)=>{
 console.log("Request Body:", req.body);
  console.log("Request Headers:", req.headers);
    let error=false;
  try{ 
  const { username, email, password } = req.body;

    const inputvalidation=  object({
        username:string().min(5).max(30),
        email:string().email(),
        password:string(),
    })

    const verifyinginputvalidation=  inputvalidation.safeParse(req.body);
    if(!verifyinginputvalidation.success){
        error=true;
        res.status(403).json({
            message:"incorrect credentials",
           
        })
        return;
    }

    const hashedpassword= await hash(password,5);

    await Usermodel.create({
        username:username,
        email:email,
        password:hashedpassword
    })  
}
catch(e){
    error=true;
    res.status(403).json({
        message:"error in authentication",
    })
}

if(!error){
    res.json({
        success:true,
        message:"you are signed up"
    })
}
})



app.post("/api/signin",async(req,res)=>{
let error=false;
try{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    const user= await Usermodel.findOne({
        username:username,
        email:email
    })

   const comparepassword= await compare(password,user.password);

   if(user&&comparepassword){
 const token= sign({
            userid:user._id.toString(),
        },JWT_SECRET);
      return res.json({
            token:token,
            username:username,
            success:true,
            message:"you are signed in"
        })
   }
   else{
    error=true;
    res.status(403).json({
        message:"incorrect credentials",
    })
    return;
   }
}

   catch(e){
    error=true;
    console.log(e);
    
    res.status(403).json({
        message:"something went wrong"
    })
   } 
   
})


const auth = (req, res, next) => {
  try {
    const token = req.headers.token; // Ensure the token is passed in headers
  
    
    if (!token) {
      return res.status(403).json({
        message: "didnt get the token",
      });
    }

    const user = verify(token,JWT_SECRET); 
    if(!user){
        return res.status(403).json({
            message:"token not verified",
        })
    }

    else{
     req.id = user.userid; // Attach the user ID to the request object
    next();
  }
} 
  catch (e) {
      console.log(e);
    res.status(403).json({
        
      message: "error authenticated",
    });
  }
};


app.use(auth)
app.post("/api/tasks",auth,async(req,res)=>{
    let date=Date.now();
    let createddate=new Date(date).toDateString();
       
const indianTime = new Date().toLocaleString('en-IN', { hourCycle: 'h24', hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0,5);

    let error=false;
try{
    const title=req.body.title ||"untitled";
    const description=req.body.description ||"add a description";
    const creationdate=(`${createddate} ${indianTime}`);
    const Duedate=req.body.Duedate || (`${createddate} ${indianTime}`);
    const status=req.body.status;
    const id=req.id;
    await Taskmodel.create({
        title:title,
        description:description,
        creationdate:creationdate,
        Duedate:Duedate,
        status:status,
        id:id
    })
    }
    catch(e){
        error=true;
        res.status(403).json({
            message:"something went wrong"
        });
    }
       
    if(!error){
    res.json({
        success:true,
        message:"task created"
    })
   }
    
})



app.get("/api/tasks",auth,async(req,res)=>{
    let date=Date.now();
    let createddate=new Date(date).toDateString();
   
const indianTime = new Date().toLocaleString('en-IN', { hourCycle: 'h24', hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0,5);
    let fulltime=`${createddate} ${indianTime}`;
    try{
        const userid=req.id;
        
        
        const gettasks= await Taskmodel.find({
            id:userid
        })
        
        if(gettasks){
            gettasks.map(async(task)=>{
                if(task.Duedate<fulltime && task.status=="in_progress"){
                
                await Taskmodel.updateOne({
            _id:task._id
        },{
             
            status:"pending"
        })
    }
    })

    res.json({
        success:true,
        tasks:gettasks
    })
}

}
catch(e){
    console.log(e);
    
    res.status(403).json({
        message:"something went wrong"
    })
}

})

app.get("/api/tasks/:id",auth,async(req,res)=>{
    try{
        const userid=req.id;
        const taskid=req.params.id;
        const gettasks=await Taskmodel.find({
            _id:taskid,
            id:userid
        })

        if(gettasks){
           res.json({
                success:true,
                tasks:gettasks
            })
        }
    }
    catch(e){
        console.log(e);
        return res.status(403).json({
            message:"something went wrong"
        })
        
    }
})


app.put("/api/tasks/:id",auth,async(req,res)=>{
    let error=false;
     let date=Date.now();
    let createddate=new Date(date).toDateString();
       
const indianTime = new Date().toLocaleString('en-IN', { hourCycle: 'h24', hour: '2-digit', minute: '2-digit', second: '2-digit' }).slice(0,5);
    try{const taskid=req.params.id;
    const title=req.body.title;
    const description=req.body.description;
    const creationdate=req.body.creationdate;
    const Duedate=req.body.Duedate ||(`${createddate} ${indianTime}`); 
    const status=req.body.status;
    const task=await Taskmodel.find({
        _id:taskid,
        id:req.id
    })

    if(task){
        await Taskmodel.updateOne({
            _id:taskid,
            id:req.id
        },
            {$set:{
            title:title,
            description:description,
            creationdate:creationdate,
            Duedate:Duedate,
            status:status
        }
    })
    }
    else{
        error=true;
        res.status(403).json({
            message:"task not found"
        })
        return;
    }
    }
    catch(e){
        error:true;
        res.status(403).json({
            
            message:"something went wrong"
        })
    }
if(!error){
    res.json({
        success:true,
        message:"task updated"
    })}

})



app.delete("/api/tasks/:id",auth,async(req,res)=>{
    let error=false;
    try{
        const taskid=req.params.id;
        const task=await Taskmodel.find({
            _id:taskid,
            id:req.id
        })
    
        if(task){
            await Taskmodel.deleteOne({
                _id:taskid,
                id:req.id
            })
            res.json({
                success:true,
                message:"task deleted"
            })
        }
        else{
            error=true;
            res.status(403).json({
                message:"task not found"
            })
            return;
        }
    }
    catch(e){
        error=true;
        res.status(403).json({
            
            message:"something went wrong"
        })
    }
    if(!error){
        res.json({
            message:"task deleted"
        })
    }

})




app.post("/api/boards",auth,async(req,res)=>{
let error=false;
    const title=req.body.title || "Untitled";
const emoji=req.body.emoji || "📄";
const description=req.body.description||"Add a description";
const favourites=req.body.favourites || false;
    const userid=req.id;

try{
    const singleboard=await Boardmodel.create({
   emoji:emoji,
    title:title,
    description:description,
    favourites:favourites,
    id:userid

})
if(singleboard){

    res.json({
        success:true,
        singleboard:singleboard
    })
}
}
catch(e){
console.log(e);
error=true;

res.json({
    message:"something went wrong"

})}
})

app.get("/api/boards",auth,async(req,res)=>{

    const userid=req.id;

try{
    const allboards=await Boardmodel.find({
    id:userid

})

if(allboards){
    res.json({
        success:true,
        boards:allboards
    })
}
}
catch(e){
console.log(e);

res.json({
    message:"something went wrong"

})}
})

app.get("/api/boards/:id",auth,async(req,res)=>{

   
    const boardid=req.params.id; 
    

try{
    const singleboard=await Boardmodel.find({
    _id:boardid,
        id:req.id

})

if(singleboard){
    console.log(singleboard);
    
    res.json({
        success:true,
        boards:singleboard
    })
}
}
catch(e){
console.log(e);

res.json({
    message:"something went wrong"

})}
})



app.put("/api/boards/:id",auth,async(req,res)=>{

    const boardid=req.params.id;
    const title=req.body.title || "Untitled";
const emoji=req.body.emoji || "📄";
const description=req.body.description||"Add a description";
const favourites=req.body.favourites || false;
    const userid=req.id;

try{
    const boarddata=await Boardmodel.find({
  _id:boardid,
    id:userid
})

if(boarddata){
   const edited= await Boardmodel.updateOne({
    _id:boardid,
    id:userid},{
        $set:{
        title:title,
        emoji:emoji,
        description:description,
        favourites:favourites,
        }
    });
    if(edited){
        res.json({
            success:true,
            boards:edited
        })
    }
}

}
catch(e){
console.log(e);

res.json({
    message:"something went wrong"

})}
})



app.delete("/api/boards/:id",auth,async(req,res)=>{
let error=false;
    const boardid=req.params.id;
    const userid=req.id;

try{
    await Boardmodel.deleteOne({
        _id:boardid,
        id:userid

})
}
catch(e){
console.log(e);
error=true;
res.json({
    message:"something went wrong"

})}
if(!error){
    res.json({
        success:true,
    })
}
})

app.post("/api/sections/:id",auth,async(req,res)=>{
    const title=req.body.title || "untitled section";
    const emoji=req.body.emoji || "📄";
    const boardid=req.params.id;

    try{
     const sectionn = await Sectionmodel.create({  
            emoji:emoji,
            title:title,
            boardid:boardid
        })
        if(sectionn){
            res.json({
                success:true,
                eachsection:sectionn
            })
        }
    }
    catch(e){
        console.log(e);
        res.json({
            message:"something went wrong"
        })
        
    }
})



app.get("/api/sections/:id",auth,async(req,res)=>{
  
    const boardid=req.params.id;

    try{
        const allsections=await Sectionmodel.find({
            
            boardid:boardid
        })

        if(allsections){
            res.json({
                success:true,
                allsections:allsections
            })
        }
        else{
            req.json({
                message:"no sections available"
            })
        }
    }
    catch(e){
        console.log(e);
        res.json({
            message:"something went wrong"
        })
        
    }
})



app.delete("/api/sections/:id",auth,async(req,res)=>{
    
    const sectionid=req.params.id;
    const boardid=req.body.boardid;
    let error=false;

    try{
        await Sectionmodel.deleteOne({
            _id:sectionid,
            boardid:boardid
        })
    }
    catch(e){
        console.log(e);
        error=true;
        res.json({
            message:"something went wrong"
        })
    }
    if(!error){
        res.json({
            success:true,
            message:"deleted succesfully"
        })
    }
})


app.post("/api/cards/:id",auth,async(req,res)=>{

    const sectionid= req.params.id;
    const title=req.body.title ||"untitled card";
    const description =req.body.description || "add a description";
try{
   const gotcard= await Cardmodel.create({
        title:title,
        description:description,
        sectionid:sectionid
    })
    if(gotcard){
        res.json({
            success:true,
            gotcard:gotcard
        })
    }
    }

    catch(e){
        console.log(e);
        res.json({
            message:"something went wrong"
        })
        
    }
})

app.get("/api/cards/:id",auth,async(req,res)=>{

    const sectionid= req.params.id;

try{
   const allcard= await Cardmodel.find({
        sectionid:sectionid
    })
    if(allcard){
        res.json({
            success:true,
            allcard:allcard
        })
    }
    }

    catch(e){
        console.log(e);
        res.json({
            message:"something went wrong"
        })
        
    }
})


app.get("/api/card/:id/:cardid",auth,async(req,res)=>{

    const sectionid= req.params.id;
    const cardid=req.params.cardid;

try{
   const allcard= await Cardmodel.find({
    _id:cardid,    
    sectionid:sectionid
    })
    if(allcard){
        res.json({
            success:true,
            allcard:allcard
        })
    }
    }

    catch(e){
        console.log(e);
        res.json({
            message:"something went wrong"
        })
        
    }
})

app.put("/api/cards/:id",auth,async(req,res)=>{
    const cardid= req.params.id;
    const sectionid= req.body.sectionid;
    const title=req.body.title ||"untitled card";
    const description =req.body.description || "add a description";
        console.log(title);
        console.log(description);
try{
    
     const updated=  await Cardmodel.updateOne(
      { _id: cardid, sectionid: sectionid },
      {
        $set: {
          title: title,
          description: description,
          sectionid: sectionid
        }
      }
    );
if(updated){
    res.json({
        success:true
    })

    }
    }

    catch(e){
        console.log(e);
        // error=true;
        res.json({
            message:"something went wrong"
        })
    }
   
})


app.put("/api/cards/:id/move",auth,async(req,res)=>{
    const cardid= req.params.id;
    const sectionid= req.body.sectionid;

try{
    
     const updated=  await Cardmodel.updateOne(
      { _id: cardid },
      {
        $set: {
          sectionid: sectionid
        }
      }
    );
if(updated){
    res.json({
        success:true,
        gotcard:updated
    })

    }
    }

    catch(e){
        console.log(e);
        // error=true;
        res.json({
            message:"something went wrong"
        })
    }
   
})


app.delete("/api/cards/:id",auth,async(req,res)=>{
let error=false;
    const cardid= req.params.id;
    const sectionid= req.body.sectionid;

try{
    await Cardmodel.deleteOne({
        _id:cardid,
        sectionid:sectionid
    })
    }

    catch(e){
        error=true;
        console.log(e);
        res.json({
            message:"something went wrong"
        })
    }
    if(!error){
        res.json({
            success:true
        })
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}
catch(e){
    console.log(e);
    console.log("error connecting to database");
}
}
startserver();

