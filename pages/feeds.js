import React from 'react';
import Image from 'next/image';
import {GoSignOut} from 'react-icons/go';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PublicIcon from '@mui/icons-material/Public';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Feeds() {
  const {data:session} = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if(!session) {
      router.push('/auth/signup')
    }
  },[]);

  return (
    <>
      <main className="h-screen flex justify-center bg-gradient-to-b from-indigo-500 via-sky-500 to-pink-500">
            <div className="w-full sm:w-[400px] h-full bg-white overflow-y-scroll">
                {/* profile holder */}
                <header className="flex flex-row justify-between bg-indigo-300 p-3 shadow-md">
                    <Image 
                    width={140} 
                    height={58} 
                    className="w-auto" 
                    src="/facepal_logo.png"
                    alt="profile photo" />
                    
                    <Image 
                    className="rounded-full" 
                    width={58} 
                    height={58} 
                    src={session?.user.image}
                    alt="profile photo" />
                </header>

                {/* previous posts holder  */}

                <div className="flex flex-col gap-2 p-3">
                    <form className="flex flex-col border border-gray-100 bg-white rounded-md shadow-md p-3 mb-4 gap-4">
                        <div className='flex flex-row justify-between items-center gap-4'>
                            <Image 
                            className="rounded-full" 
                            width={48} 
                            height={48}
                            src={session?.user.image} 
                            alt="profile photo" />

                            <textarea 
                            className='w-full p-3 focus:outline-0 bg-gray-200 rounded-full'
                            placeholder='Write a post'
                            rows={1}/>
                        </div>
                        <hr style={{color:'black'}}/>

                        <div className='flex flex-row justify-around  gap-4'>
                            <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                                <VideoCameraFrontIcon sx={{ color: 'red' }} />
                                Live video
                            </button>
                            <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                                <PhotoLibraryIcon sx={{ color: 'green' }} />
                                Photo/video
                            </button>
                            <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                                <SentimentVerySatisfiedIcon sx={{ color: 'yellow' }} />
                                Feelig/activity
                            </button>
                        </div>
                        
                    </form>

                    {/* previous posts holder */}

                    <div className="flex flex-col gap-2">

                        {/* single post  */}
                        <div className="border border-gray-100 bg-white rounded-md shadow-md py-4 mb-4">
                            <ul className="flex justify-between px-4">
                                <li className="flex flex-row gap-1 items-center">
                                    <Image 
                                    className="rounded-full" 
                                    src={session?.user.image} 
                                    width={40} height={40} 
                                    alt="profile photo"/>                                
                                    <div className='flex flex-col'>
                                        <small className="text-gray-800">{session?.user.name}</small>
                                        <small className='text-gray-500'>
                                            1d . 
                                            <PublicIcon sx={{fontSize:15}} />
                                        </small>
                                    </div>
                                </li>
                                <li>
                                    <div className="text-gray-700">
                                        <button className='p-2 hover:bg-gray-200 rounded-full'>
                                            <MoreHorizIcon />
                                        </button>
                                        <button className='p-2 hover:bg-gray-200 rounded-full'>
                                            <ClearIcon />
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            
                            <p className='px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tenetur. Natus provident id quae delectus ab. Asperiores, veritatis!</p>
                            <Image  
                            src='/fones.jpg' 
                            width={50}
                            height={50}
                            className='w-full py-4'/>
                            <div className='flex flex-row justify-between px-4'>
                                <div className='flex items-center justify-center w-[20px] h-[20px] rounded-full bg-sky-800'>
                                    <ThumbUpIcon 
                                    sx={{ color:'white',fontSize:15 }}
                                    />
                                </div>
                                <span className='text-gray-500'>
                                    2 comments
                                </span>
                            </div>
                            <hr style={{color:'black'}}/>

                            <div className='flex flex-row justify-around  gap-4 pt-2'>
                                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                                    <ThumbUpIcon />
                                    Like
                                </button>
                                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                                    <ChatBubbleOutlineRoundedIcon />
                                    Comment
                                </button>
                                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                                    <ReplyOutlinedIcon  />
                                    Share
                                </button>
                            </div>
                        </div>     
                        {/* end of first post */}
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

