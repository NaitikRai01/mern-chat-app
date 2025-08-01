 import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const {getUsers,users,selectedUser,setSelectedUser,unseenMessages,setUnseenMessages}=useContext(ChatContext)
  const {logout,onlineUsers}=useContext(AuthContext)
  const[input,setInput]=useState(false)
  const navigate=useNavigate();

  const filteredUsers=input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers();

  },[onlineUsers])


  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" :''}`}>
    <div className='pb-5'>
      <div className='flex justify-between items-center'>
         <img src={assets.logo} alt="logo" className='max-w-40'/>
         <div className='relative py-2 group'>
            <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer'/>
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
            
            <p onClick={()=>navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className='my-2 border-t border-gray-500'></hr>
            
            <p onClick={()=>logout()} className='cursor-pointer text-sm'>Logout</p>
                
            </div>
         </div>
       </div>
       <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
        <img src={assets.search_icon} alt='Search' className='w-3'/>
        <input onChange={(e)=>setInput(e.target.value)} type='text' className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search user...'/>
       </div>

    </div>
    <div className='flex flex-col'>
     {filteredUsers.map((user,index)=>(
      <div onClick={()=>{setSelectedUser(user),setUnseenMessages(prev=>({...prev,[user._id]:0}))}} 
      key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-[#282142]/50'}`}>
        <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full'/>
        <div className='flex flex-col leading-5'>
          <p>{user.fullName}</p>
          {
            onlineUsers.includes(user._id)
            ?<span className='text-green-400 text-xs'>Online</span>
            :<span className='text-neutral-400 text-xs'>Offline</span>
          }
       

        </div>
        {unseenMessages[user._id]>0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
       
      </div>
      
     ))}

    </div>
    </div>
  )
}

export default Sidebar  


/*import React, { useState } from 'react';
import assets, { userDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // ⬅️ added state

  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center relative'>
          <img src={assets.logo} alt="logo" className='max-w-40' />*/

          {/* ⬇️ Wrapping icon + menu together */}
          /*<div className='relative'>
            <img
              src={assets.menu_icon}
              alt="Menu"
              className='max-h-5 cursor-pointer'
              onClick={() => setShowMenu(prev => !prev)} // toggle on click
            />

            {showMenu && (
              <div className='absolute top-full right-0 z-20 w-32 p-4 mt-2 rounded-md bg-[#282142] border border-gray-600 text-gray-100 shadow-lg'>
                <p onClick={() => { navigate('/profile'); setShowMenu(false); }} className='cursor-pointer text-sm hover:text-violet-300'>Edit Profile</p>
                <hr className='my-2 border-t border-gray-500' />
                <p onClick={() => { console.log("Logout clicked"); setShowMenu(false); }} className='cursor-pointer text-sm hover:text-violet-300'>Logout</p>
              </div>
            )}
          </div>
        </div>

        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt='Search' className='w-3' />
          <input type='text' className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search user...' />
        </div>
      </div>

      <div className='flex flex-col'>
        {userDummyData.map((user, index) => (
          <div onClick={() => { setSelectedUser(user); }} key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}>
            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full' />
            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>
              {
                index < 3
                  ? <span className='text-green-400 text-xs'>Online</span>
                  : <span className='text-neutral-400 text-xs'>Offline</span>
              }
            </div>
            {index > 2 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
*/
