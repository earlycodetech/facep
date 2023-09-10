import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {GoSignOut} from 'react-icons/go';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession,signOut } from 'next-auth/react';
import PostDisplay from '@/components/PostDisplay';
import { db } from '@/settings/firebase.setting';
import { collection,query,where,getDocs,orderBy } from 'firebase/firestore';

export default function Profile() {
  const {data:session} = useSession();
  const [userPosts,setUserPosts] = React.useState([]);

  const handleGetUserPosts = async () => {
    const q = query(
        collection(db,'posts'),
        where('author','==',session.uid),
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
  handleGetUserPosts()

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/facepal_icon_logo.ico" type="image/x-icon" />
        <title>facepal | Profile</title>
        <meta name="description" content="facepal is the coolest social media platform to connect with friends and hold money" />
      </Head>
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
                        <ul className="flex flex-row justify-between mt-1">
                            <li className="text-sm text-gray-700">pal since 2022</li>
                            <li className="text-sm text-gray-700">
                              <GoSignOut 
                              className="text-gray-800 my-3"
                              onClick={() => signOut()}/>
                            </li>
                        </ul>
                    </div>
                </header>

                {/* previous posts holder  */}

                <div className="flex flex-col gap-2 p-3">
                    {
                        userPosts.map(post => (
                        <div key={post.id}>
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

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req,context.res,authOptions);
  
    if(!session) {
      return {
        redirect:{
          destination:'/auth/signup',
          permanent:false,
        }
      }
    }
  
    return {
      props:{
        session:session
      }
    }
}