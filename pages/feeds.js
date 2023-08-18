import React from 'react';
import Image from 'next/image';
import {GoSignOut} from 'react-icons/go';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import WritePost from '@/components/WritePost';

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

                <div className="flex flex-col gap-2 p-3">
                    <WritePost/>

                    {/* previous posts holder */}
                    <div className="flex flex-col gap-2">

                        {/* single post  */}
                           
                        {/* end of first post */}
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

