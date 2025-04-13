import mongoose from "mongoose";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
       const { message } = req.body;
       const { id : receiverId } = req.params;
       const senderId = req.user._id;

       let conversation = await Conversation.findOne({
        participants : { $all : [senderId , receiverId]}
       })

       if(!conversation){
          conversation = await Conversation.create({
            participants : [senderId , receiverId],
          })
       }

       const newMessage = new Message({
           senderId,
           receiverId,
           message ,
       })

       if(newMessage){
          conversation.messages.push(newMessage._id)
       }

       // socket io functionality 

    //    await conversation.save();
    //    await newMessage.save();

       await Promise.all([await conversation.save(),await newMessage.save()]) // this will run in parallel

       res.status(201).json(newMessage)
       

    }
    catch (error) {
        console.log("Error in Message Controller", error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

export const getMessage = async (req , res ) => {
    try {
       const { id:userToChatId} = req.params;
       const senderId = req.user._id;

       const conversation = await Conversation.findOne({
        participants : { $all : [senderId,userToChatId]}
       }).populate("messages")

       if(!conversation) return res.status(200).json([])

       res.status(200).json(conversation.messages)
    } 
    catch (error) {
        console.log("Error in Message Controller getMessage ", error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}