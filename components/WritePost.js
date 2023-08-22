import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Button,TextField } from '@mui/material';
import { db } from '@/settings/firebase.setting';
import { collection,addDoc } from 'firebase/firestore';

export default function WritePost() {
    const {data:session} = useSession();
    const [formInput,setFormInput] = useState('');

    // create post to firestore
    const handleCreatePost = async () => {
        await addDoc(collection(db,'posts'),{
            body:formInput,
            author:session.user.email,
            postedAt:new Date().getTime()
        })
        .then(() => {
            setFormInput('');
            alert('Your post was published');
        })
        .catch(error => console.error(error))
    }

    return (
        <form className="flex flex-col border border-gray-100 bg-white rounded-md shadow-md p-3 mb-4 gap-4">
            <div className='flex flex-row items-center gap-4'>
                <Image 
                className="rounded-full" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='w-full flex flex-col gap-2'>
                    <TextField
                    multiline={true}
                    className='w-full'
                    placeholder="what's on your mind ..."
                    value={formInput}
                    onChange={(text) => setFormInput(text.target.value)}/>

                    {formInput.length > 0
                    ? <Button 
                    variant='outlined'
                    className='block w-[100px]'
                    onClick={handleCreatePost}>Post</Button>
                    : null}
                </div>
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
    )
}