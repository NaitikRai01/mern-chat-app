import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { io } from "socket.io-client";
//import { set } from "mongoose";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;



export const AuthContext=createContext();
export const AuthProvider=({children})=>{
       const [token,setToken]=useState(localStorage.getItem("token"))
       const [authUser,setAuthUser]=useState(null);
       const [onlineUsers,setOnlineUsers]=useState([]);
       const [socket,setSocket]=useState(null);
       

       // check is the user is autinticated nd if so,set the user data and connect the socket
       const checkAuth=async()=>{
        try {
           const {data}= await axios.get("/api/auth/check")
           if(data.success){
            setAuthUser(data.user)
            connectSocket(data.user)
           }
            
        } catch (error) {
            toast.error(error.message)

            
        }
       }


       //login function to handle user authenticattion and function

       const login=async(state,credentials)=>{
        try {
            const {data}=await axios.post(`/api/auth/${state}`,credentials);
            if(data.success){
                setAuthUser(data.userData);
                connectSocket(data.userData);
               axios.defaults.headers.common["token"]=data.token;
               

                

                setToken(data.token);
                localStorage.setItem("token", data.token)
                toast.success(data.message)
            }
        
            
            else{
                toast.error(data.message)

            }
            
        } catch (error) {
            toast.error(error.message)
            
        }

       }




       



       //logout function to handle user logout and socket connection
       const logout=async ()=>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("Logged out sucessfully")
        socket.disconnect();
       }


       //update profile function to handle user profile updates

       const updateProfile = async (body)=>{
        try {
            const {data} =await axios.put("/api/auth/update-profile",body);
            //const { data } = await axios.put("/api/users/update-profile", body);

            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated succesfully")
            }
            
        } catch (error) {
            toast.error(error.message)
            
            
        }

       }

        




       
       //coonnect socket function to handle socket connection and online user updates
       const connectSocket=(userData)=>{
        if(!userData||socket?.connected) return;
        const newSocket=io(backendUrl,{
            query:{
                userId:userData._id,

            }
            
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUsers(userIds);
        })
       }
      useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"]=token;
            checkAuth()
        }
       

      },[token]);

       const value={
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}





