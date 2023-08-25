import React from 'react';
import Image from 'next/image';
import {GoSignOut} from 'react-icons/go';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import PostDisplay from '@/components/PostDisplay';
import { db } from '@/settings/firebase.setting';
import { collection,query,where,getDocs,orderBy } from 'firebase/firestore';

export default function Feeds() {
  const {data:session} = useSession();
  const router = useRouter();
  const [userPosts,setUserPosts] = React.useState([]);

  const handleGetUserPosts = async () => {
    const q = query(
        collection(db,'posts'),
        where('author','==',session.user.email),
        orderBy('postedAt','desc')
    );
    const onSnapShot = await getDocs(q);
    setUserPosts(onSnapShot.docs.map(doc => {
        return {
            id:doc.id,
            data:{
                ...doc.data()
            }
        }
    }))
  }
  handleGetUserPosts();

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
                <header className="bg-indigo-300 p-3 ">
                    <div className="flex flex-col gap-1 items-center">
                        <div className="bg-gradient-to-b from-indigo-500 via-sky-500 to-pink-500 p-1 rounded-full">
                            <Image 
                            className="rounded-full" 
                            width={58} 
                            height={58} 
                            src={session?.user.image}
                            alt="profile photo" />
                        </div>
                        <small className="text-gray-700"><em>{session?.user.email}</em></small>
                        <p className="text-gray-700 font-bold">{session?.user.name}</p>
                    </div>

                    <div>
                        <p className="text-sm mt-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias eum voluptatum distinctio rem culpa
                            aperiam assumenda deserunt molestias,
                            doloremque iusto adipisicing elit. Reprehenderit est vitae alias officiis!
                        </p>
                        
                        <GoSignOut 
                        className="text-gray-800 my-3"
                        onClick={() => signOut()}/>

                        <ul className="flex flex-row justify-between mt-1">
                            <li className="text-sm text-gray-700">🇹🇴 Abuja</li>
                            <li className="text-sm text-gray-700">pal since 2022</li>
                        </ul>
                    </div>
                </header>

                {/* previous posts holder  */}

                <div className="flex flex-col gap-2 p-3">
                    {
                        userPosts.map(post => (
                        <div id={post.id}>
                            <PostDisplay 
                            postID={post.id}
                            timePosted={post.data.postedAt}
                            body={post.data.body}
                            postImage={post.data.imageUrl}
                            />
                        </div>
                        ))
                    }
                </div>
            </div>
        </main>
    </>
  )
}