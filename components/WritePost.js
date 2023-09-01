import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button,TextField } from '@mui/material';
import { db,storage } from '@/settings/firebase.setting';
import { collection,addDoc,updateDoc,doc } from 'firebase/firestore';
import { cdnImages } from '@/assets/demo_cdn_images';
import { rangeOfRandNums } from '@/assets/range-of-rand-nums';
import { ref,uploadString,getDownloadURL } from 'firebase/storage';

export default function WritePost() {
    const {data:session} = useSession();
    const [formInput,setFormInput] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);

    //get image file and convert to base64 string
    const imageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readEvent) => {
            setSelectedFile(readEvent.target.result);
        }
    }

    // create post to firestore
    const handleCreatePost = async () => {
        const docRes = await addDoc(collection(db,'posts'),{
            body:formInput,
            author:session.user.email,
            postedAt:new Date().getTime(),
            imageUrl:cdnImages[rangeOfRandNums(0,cdnImages.length)]
        });

        const imageRef = ref(storage,`posts/${docRes.id}/image`);

        await uploadString(imageRef,selectedFile,'data_url')
        .then(async () => {
            const imgUrl = await getDownloadURL(imageRef);
            updateDoc(doc(db,'posts',docRes.id),{
                imageUrl:imgUrl,
            });

            setFormInput('');
            alert('Your post was published');
        })
        .catch((e) => console.error(e))
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
                    ? 
                    <div className='flex flex-col gap-4'>
                        <input 
                        type="file" 
                        accept='image/*'
                        onChange={imageToPost}/>

                        <Button 
                        variant='outlined'
                        className='block w-[100px]'
                        onClick={handleCreatePost}>Post</Button>
                    </div>
                    : null}
                </div>
            </div>
        </form>
    )
}