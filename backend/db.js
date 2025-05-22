import {mongoose} from "mongoose";

 const Schema=mongoose.Schema;

 const Objectid=Schema.ObjectId;

const User= new Schema({
    username:String,
    email:{type:String,unique:true},
    password:String,

})

const Tasks=new Schema({
title:String,
description:String,
creationdate:String,
Duedate:String,
status:{type:String,default:"In Progress"},
id:Objectid

})
const Boards=new Schema({
title:String,
emoji:{type:String,required:true,maxlength:2},
description:String,
favourites:Boolean,
id:Objectid

})
const Sections=new Schema({
    emoji:{type:String,required:true,maxlength:2},
title:String,
boardid:Objectid

})
const Cards=new Schema({
title:String,
description:String,
sectionid:Objectid

})

export const Usermodel=mongoose.model("users",User);
export const Taskmodel=mongoose.model("tasks",Tasks);
export const Boardmodel=mongoose.model("boards",Boards);
export const Sectionmodel=mongoose.model("sections",Sections);
export const Cardmodel=mongoose.model("cards",Cards);


