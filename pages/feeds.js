import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import WritePost from '@/components/WritePost';
import {getDocs,collection} from 'firebase/firestore';
import { db } from '@/settings/firebase.setting';
import PostDisplay from '@/components/PostDisplay';

/*
REMOVE
1. live video, et al block
2. share from post
3. X form top of post
*/

export default function Feeds() {
  const {data:session} = useSession();
  const [posts,setPosts] = useState([]);
  const router = useRouter();

  React.useEffect(() => {
    if(!session) {
      router.push('/auth/signup')
    }
  },[]);

  //get posts from firestore
  const getPosts = async () => {
    const res = await getDocs(collection(db,'posts'));

    setPosts(res.docs.map(doc => {
      return {
        id:doc.id,
        data:{
          ...doc.data()
        }
      }
    }))
  }
  getPosts();

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

                <div className="flex flex-col gap-2 p-3">
                    <WritePost/>

                    {/* previous posts holder */}
                    <div className="flex flex-col gap-2">
                        {
                          posts.map(post => (
                            <div id={post.id}>
                              <PostDisplay 
                              timePosted={post.data.postedAt}
                              body={post.data.body}
                              postImage={post.data.imageUrl}
                              />
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

