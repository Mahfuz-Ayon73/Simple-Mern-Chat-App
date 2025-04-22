import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import MessageContainer from '../../components/messages/messagecontainer'

function HomePage() {
  return (
    <div className='flex sm:h-[550px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400/0 bg-clip-padding backdrop-blur-lg'>
    <Sidebar/>
       <MessageContainer/>
    </div>
  )
}

export default HomePage